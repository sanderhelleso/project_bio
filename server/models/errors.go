package models

import "strings"

const (

	// ErrNotFound is returned when a resource
	// cannot be found in the database
	ErrNotFound modelError = "Resource not found"

	// ErrPasswordIncorrect is returned when an invalid password
	// is used when attempting to authenticate a user
	ErrPasswordIncorrect modelError = "Incorrect password provided"

	// ErrPasswordInvalid is returned when a user attemps to
	// signup with an invalid password.
	ErrPasswordInvalid modelError = "Password is invalid"

	// ErrEmailRequired is returned when an email address
	// is not provided when creating a user
	ErrEmailRequired modelError = "Email address is required"

	// ErrEmailInvalid is returned when an email address provided
	// does not match any of our requirements
	ErrEmailInvalid modelError = "Email address is not valid"

	// ErrEmailTaken is returned when an update or create
	// is attempted with an email address that is already in use
	ErrEmailTaken modelError = "Email address is already taken"

	// ErrEmailExists is returned when both passed in IDs  are equal
	ErrEmailExists modelError = "Email is already taken by another user"

	// ErrFollowerExists is returned when a follower releationship already exists
	ErrFollowerExists modelError = "You are already following this user"

	// ErrIDInvalid is returned when an invalid ID is
	// provided to a method like Delete
	ErrIDInvalid privateError = "ID provided was invalid"

	// ErrIDMissmatch is returned when both passed in IDs  are equal
	ErrIDMissmatch privateError = "IDs provided can not be the same"

	// ErrUserIDRequired is returned when an user ID is required
	ErrUserIDRequired  privateError = "models: user ID is required"

	// ErrPasswordHashRequired is returned when a users
	// password hash is required but not present
	ErrPasswordHashRequired modelError = "Password hash is required"
)

type modelError string

func (e modelError) Error() string {
	return string(e)
}

type privateError string

func (e privateError) Error() string {
	return string(e)
}

/*********************** DB ERRORS ************************/

func isDuplicateError(err error, model string) error {
	if strings.Contains(err.Error(), "duplicate key value violates unique constraint") {
		switch model {
			case "users":
				return ErrEmailExists
			case "followers":
				return ErrFollowerExists
			default:
		}
	}

	return err
}