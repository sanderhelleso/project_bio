package models


const (

	// ErrNotFound is returned when a resource
	// cannot be found in the database
	ErrNotFound modelError = "Resource not found"

	// ErrPasswordIncorrect is returned when an invalid password
	// is used when attempting to authenticate a user
	ErrPasswordIncorrect modelError = "Incorrect password provided"

	// ErrEmailRequired is returned when an email address
	// is not provided when creating a user
	ErrEmailRequired modelError = "Email address is required"

	// ErrEmailInvalid is returned when an email address provided
	// does not match any of our requirements
	ErrEmailInvalid modelError = "Email address is not valid"

	// ErrEmailTaken is returned when an update or create
	// is attempted with an email address that is already in use
	ErrEmailTaken modelError = "Email address is already taken"

	// ErrPasswordTooShort is returned when an update or create is
	// attempted with a user passord that is less than 8 characters
	ErrPasswordTooShort modelError = "Password must be atleast 8 characters long"

	// ErrPasswordRequired is returned when a create is attempted
	// wihtout a user password provided
	ErrPasswordRequired modelError = "Password is required"

	// ErrIDInvalid is returned when an invalid ID is
	// provided to a method like Delete
	ErrIDInvalid privateError = "ID provided was invalid"

	// ErrUserIDRequired is returned when an user ID is required
	ErrUserIDRequired  privateError = "models: user ID is required"
)

type modelError string

func (e modelError) Error() string {
	return string(e)
}

type privateError string

func (e privateError) Error() string {
	return string(e)
}