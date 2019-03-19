// Package models contains models, every model has an addional 'service' layer
// that meditates communication between the releated controller layer.
// The 'service' layer contains the business logic, in particular validation
// and util methods for the database
package models

import (
	"fmt"
	"errors"
	"os"
	"../lib"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var (

	// ErrNotFound is returned when a user resource
	// cannot be found in the connected datavase
	ErrNotFound = errors.New("models: user resource was not found")

	// ErrInvalidID is returned when an invalid user ID is provided
	// to a method where a valid ID is required for the method to proccess
	ErrInvalidID = errors.New("models: The provided user ID was invalid")
)

// Create will create the provided user and backfill
// data with ID, CreatedAt and UpdatedAt fields
func (us *UserService) Create(user *User) error {
	return us.db.Create(user).Error
}

// NewUserService creates a connection to the database
//
// - If connection was successfull, returns a pointer
// 	to new 'UserService' struct, containing the db connection, and nil error
//
// - If the connection was not successfull, return nil for 'UserService'
//	and the error that occured during initialization of method
func NewUserService(connectionInfo string) (*UserService, error) {
	db, err := gorm.Open(os.Getenv("DB_TYPE"), connectionInfo)
	if err != nil {
		return nil, err
	}

	return &UserService{
		db,
	}, nil
}

// AutoMigrate will attempt to automatically migrate the users table
func (us *UserService) AutoMigrate() error {
	err := us.db.AutoMigrate(&User{}).Error
	return err
}

// DestructiveReset drops the existing user table and rebuilds it
func (us *UserService) DestructiveReset() error {
	if err := us.db.DropTableIfExists(&User{}).Error; err != nil {
		return err
	}

	return us.AutoMigrate()
}

// Close will close the user service connection to the database
func (us *UserService) Close() error {
	return us.db.Close()
}

// ConnectToUserServiceDB will attempt to connect to 
// the database using the variables sat in the .env 
// configuration returns a pointer to a 'UserService'
// or the function will panic with error and kill app
func ConnectToUserServiceDB() (*UserService) {
	us, err := NewUserService(lib.ConnectionInfo())
	lib.Must(err)

	//us.DestructiveReset()
	us.AutoMigrate()

	fmt.Println("Connected to database...")
	return us
}

// User represent a user in the project
type User struct {
	gorm.Model          // `ID`, `CreatedAt`, `UpdatedAt`, `DeletedAt`
	Username     string `gorm:"size:30;not null;unique_index"`
	InstagramURL string `gorm:"unique"`
}

// UserService represents a connection layer
// between the user model and database ops
type UserService struct {
	db *gorm.DB
}