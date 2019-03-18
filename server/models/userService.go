package models

import (
	"errors"
	"os"

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

// User represent a user in the project
type User struct {
	Username     string `json:"username"`
	InstagramURL string `json:"instagramURL"`
}

// UserService represents a connection layer
// between the user model and database ops
type UserService struct {
	db *gorm.DB
}

// NewUserService creates a connection to the database
//
// - If connection was successfull, returns a pointer
// 	to new 'UserService' struct, containing the db connection, and nil error
//
// - If the connection was not successfull, return nil for 'UserService'
//	and the error that occured during initialization of method
func NewUserService(connectionInfo string) (*UserService, error) {
	db, err := gorm.Open(os.Getenv("database"), connectionInfo)
	if err != nil {
		return nil, err
	}

	return &UserService{
		db,
	}, nil
}
