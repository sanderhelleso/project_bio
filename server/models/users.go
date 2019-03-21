// Package models contains models, every model has an addional 'service' layer
// that meditates communication between the releated controller layer.
// The 'service' layer contains the business logic, in particular validation
// and util methods for the database
package models

import (
	"os"
	"strings"
	"unicode"
	"regexp"
	"golang.org/x/crypto/bcrypt"


	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// User represent a user in the application
type User struct {
	gorm.Model          	// `ID`, `CreatedAt`, `UpdatedAt`, `DeletedAt`
	Email	    	string 	`gorm:"size:30;not null;unique_index"`
	Password		string 	`gorm:"-"` // ignore in DB
	PasswordHash	string 	`gorm:"not null"`
	Profile 		Profile `gorm:"foreignkey:UserID;"`
}

// UserData represents the users data
type UserData struct {
	ID	  uint
	Email string
	FirstName string
	LastName string
}

// UserDB is used to interact with the users database
//
// For all single user queries:
// 1 - user, nil 		- User found
// 2 - nil, ErrNotFound	- User not found
// 3 - nil, otherError  - Database error
type UserDB interface {

	// methods for quering for single users
	ByID(id uint) (*User, error)
	ByEmail(email string) (*User, error)

	// methods for altering users
	Create(user *User) error
	Update(user *User) error
	Delete(id uint) error
}

// UserService is a set of methods used to mainpulate
// and work with the user model
type UserService interface {

	// Authenticate will verify the provided email and
	// password are correct, if correct, the user corresponding
	// to that email will be returned, if not the releated error
	// for the reason the method failed
	Authenticate(email, password string) (*User, error)
	UserDB
}

// ensure interface is matching
var _ UserService = &userService{}

// implementation of interface
type userService struct {
	UserDB
}

// NewUserService connect the user db and validator
func NewUserService(db *gorm.DB) UserService {
	ug := &userGorm{db}
	uv := newUserValidator(ug)

	return &userService{
		UserDB: uv,
	}
}

// Authenticate is used to authenticate a user with the provided email and password. 
//
// - If the email address provided is invald, this will return nil, ErrNotFound
//
// - If the password provided is invalid, this will return nil, ErrInvalidPassword
//
// - If the email and password are both valid, this will return user, nil
//
// Otherwise if another error is encountered this will return nil, error
func (us *userService) Authenticate(email, password string) (*User, error) {

	// find user by provided email
	foundUser, err := us.ByEmail(email)
	if err != nil {
		return nil, err
	}

	// compare found users passwordHash, with decrypted provided password
	err = bcrypt.CompareHashAndPassword([]byte(foundUser.PasswordHash), []byte(password + os.Getenv("USER_PWD_PEPPER")))

	// handle errors after case occured
	if err != nil {
		switch err {
			case bcrypt.ErrMismatchedHashAndPassword:
				return nil, ErrPasswordIncorrect
			default:
				return nil, err
		}
	}

	return foundUser, nil
}


/******************* VALIDATORS **************************/

type userValFunc func(*User) error

type userValidator struct {
	UserDB
	emailRegex *regexp.Regexp
}

func runUsersValFuncs(user *User, fns ...userValFunc) error {
	for _, fn := range fns {
		if err := fn(user); err != nil {
			return err
		}
	}

	return nil
}

func newUserValidator(udb UserDB) *userValidator {
	return &userValidator{
		UserDB: udb,
		emailRegex: regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,16}$`),
	}
}

// ByEmail will normalize the email address before
// calling ByEmail on the UserDB field
func (uv *userValidator) ByEmail(email string) (*User, error) {
	user := User{
		Email: email,
	}

	err := runUsersValFuncs(&user,
		uv.normalizeEmail,
		uv.emailFormat,
		uv.requireEmail)

	if err != nil {
		return nil, err
	}

	return uv.UserDB.ByEmail(user.Email)
}

// Create will create the provided user and backfill
// data with ID, CreatedAt and UpdatedAt fields
func (uv *userValidator) Create(user *User) error {
	err := runUsersValFuncs(user,
		uv.passwordFormat,
		uv.bcryptPassword,
		uv.passwordHashRequired,
		uv.normalizeEmail,
		uv.emailFormat,
		uv.requireEmail,
		uv.emailFormat)

	if err != nil {
		return err
	}

	return uv.UserDB.Create(user)
}

// Delete will remove the provided user from the database,
// removing all traces of the user and its data
func (uv *userValidator) Delete(id uint) error {
	var user User
	user.ID = id

	err := runUsersValFuncs(&user, uv.idGreaterThan(0))
	if err != nil {
		return err
	}

	return uv.UserDB.Delete(id)
}

// bcryptPassword will hash a users password with a
// predefined pepper(userPwPepper) and bcrypt if the
// password field is not the empty string
func (uv *userValidator) bcryptPassword(user *User) error {
	if user.Password == "" {
		return nil
	}

	pwBytes := []byte(user.Password + os.Getenv("USER_PWD_PEPPER"))
	hashedBytes, err := bcrypt.GenerateFromPassword(pwBytes, bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	user.PasswordHash = string(hashedBytes) // convert byteslice to string
	user.Password = ""
	return nil
}

func (uv *userValidator) passwordFormat(user *User) error {
	
	gotUC, gotLC, gotN := false, false, false
    for _, c := range user.Password {
        switch {
			case unicode.IsNumber(c):
				gotN = true
			case unicode.IsUpper(c):
				gotUC = true
			case unicode.IsLower(c):
				gotLC = true
			default:
        }
	}

	if !(gotUC && gotLC && gotN && len(user.Password) >= 8) {
		return ErrPasswordIncorrect
	}
	
    return nil
}

func (uv *userValidator) idGreaterThan(n uint) userValFunc {
	return userValFunc(func(user *User) error {
		if user.ID <= n {
			return ErrIDInvalid
		}

		return nil
	})
}

func (uv *userValidator) normalizeEmail(user *User) error {
	user.Email = strings.TrimSpace(strings.ToLower(user.Email))
	return nil
}

func (uv *userValidator) requireEmail(user *User) error {
	if user.Email == "" {
		return ErrEmailRequired
	}

	return nil
}

func (uv *userValidator) emailFormat(user *User) error {
	if !uv.emailRegex.MatchString(user.Email) {
		return ErrEmailInvalid
	}

	return nil
}

func (uv *userValidator) emailIsAvail(user *User) error {
	existing, err := uv.ByEmail(user.Email)

	if err == ErrNotFound {
		// email address is not taken
		return nil
	}

	if err != nil {
		return err
	}

	// we found a user with this email address...
	// If the found user has the same ID as this user,
	// it is an update and this is the same user of email
	if user.ID != existing.ID {
		return ErrEmailTaken
	}

	return nil
}

func (uv *userValidator) passwordHashRequired(user *User) error {
	if user.PasswordHash == "" {
		return ErrPasswordHashRequired
	}

	return nil
}


// ensure interface is matching
var _ UserDB = &userGorm{}

type userGorm struct {
	db *gorm.DB
}

// ByID will look up a user by the id provided
// Cases:
// 1 - user, nil 		- User found
// 2 - nil, ErrNotFound	- User not found
// 3 - nil, otherError  - Database error
func (ug *userGorm) ByID(id uint) (*User, error) {
	var user User
	db := ug.db.Where("id = ?", id)
	err := first(db, &user)
	return &user, err
}

// ByEmail looks up a user with the given email address
// and returns that user
//
// 1 - user, nil 		- User found
// 2 - nil, ErrNotFound	- User not found
// 3 - nil, otherError  - Database error
func (ug *userGorm) ByEmail(email string) (*User, error) {
	var user User
	db := ug.db.Where("email = ?", email)
	err := first(db, &user)
	return &user, err
}

// Create will create the provided user and backfill data
// like the ID, CreatedAt and UpdatedAt fields
//
// If duplicate error, send custom message, else standard
func (ug *userGorm) Create(user *User) error {
	err := ug.db.Create(user).Error
	return isDuplicateError(err, "users")
}

// Update will update the provided user with all of the
// data in the provided user object
func (ug *userGorm) Update(user *User) error {
	return ug.db.Save(user).Error
}

//Delete will delete the user with the provided ID
func (ug *userGorm) Delete(id uint) error {
	user := User{Model: gorm.Model{ID: id}}
	return ug.db.Delete(&user).Error
}