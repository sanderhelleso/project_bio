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

	// ErrIDInvalid is returned when an invalid ID is
	// provided to a method like Delete
	ErrIDInvalid modelError = "ID provided was invalid"

	// ErrIDMissmatch is returned when both passed in IDs  are equal
	ErrIDMissmatch modelError = "IDs provided can not be the same"

	// ErrUserIDRequired is returned when an user ID is required
	ErrUserIDRequired  modelError = "models: user ID is required"

	// ErrPasswordHashRequired is returned when a users
	// password hash is required but not present
	ErrPasswordHashRequired modelError = "Password hash is required"

	// ErrPromoTitleInvalid is returned when a promo is atempted created
	// with a to short or long title
	ErrPromoTitleInvalid modelError = "Title must be between 2 and 100 characters"

	// ErrPromoBrandInvalid is returned when a promo is atempted created
	// with a to short or long title
	ErrPromoBrandInvalid modelError = "Brand name must be between 2 and 100 characters"

	// ErrPromoDescriptionInvalid is returned when a promo is atempted created
	// with a to short or long title
	ErrPromoDescriptionInvalid modelError = "Description must be between 2 and 255 characters"

	// ErrPromoPercentageOffInvalid is returned when a promo is atempted created
	// with an invalid percentage of value
	ErrPromoPercentageOffInvalid modelError = "Percentage off must be between 1 and 100"

	// ErrPromoCurrencyInvalid is returned when a promo is atempted created
	// with an invalid currency
	ErrPromoCurrencyInvalid modelError = "Currency must be in the format 'XXX'. Currency for US Dollars would be 'USD'"

	// ErrPromoExpiresAtInvalid is returned when a promo is atempted created
	// with an invalid expirationAt date
	ErrPromoExpiresAtInvalid modelError = "Expiration date cannot be a date that is in the present"

	// ErrProfileHandleRequired is returned when a profile is atempted created
	// with an empty handle
	ErrProfileHandleRequired modelError = "Handle must be all lowercase and cannot contain space or special characters"

	// ErrProfileHandleInvalid is returned when a profile is atempted created
	// with an to long or short handle length
	ErrProfileHandleInvalid modelError = "Handle must be between 2 and 30 characters"

	// ErrProfileNameRequired is returned when a profile is atempted created
	// with an empty name
	ErrProfileNameRequired modelError = "Name is required"

	// ErrProfileNameInvalid is returned when a profile is atempted created
	// with an invalid name format
	ErrProfileNameInvalid modelError = "Name must be between 2 and 70 characters"

	// ErrProfileBioInvalid is returned when a profile is atempted created
	// with an invalid bio length
	ErrProfileBioInvalid modelError = "Bio cannot be longer than 150 characters"

	// ErrProfileInstagramURLInvalid is returned when a profile is atempted created
	// with an invalid bio instagram url
	ErrProfileInstagramURLInvalid modelError = "Link provided is invalid. Must be accessible and from the offical Instagram"

	// ErrPwResetTokenInvalid is returned when a user is attempting to 
	// reset a password witn an invalid password reset token
	ErrPwResetTokenInvalid modelError = "Token provided is not valid"	
	
	ErrPromoProductNameRequired modelError = "Name is required"

	ErrPromoProductNameInvalid modelError = "Name must be between 2 and 100 characters"

	ErrPromoProductBrandRequired modelError = "Brand is required"

	ErrPromoProductBrandInvalid modelError = "Brand must be between 2 and 100 characters"

	ErrPromoProductLinkRequired modelError = "Link to product is required"

	ErrPromoProductLinkInvalid modelError = "Link is in invalid format. Must be a valid link to site"
)

type modelError string

func (e modelError) Error() string {
	return string(e)
}


/*********************** DB ERRORS ************************/

func isDuplicateError(err error, model string) error {
	if err != nil {
		if strings.Contains(err.Error(), "duplicate key value violates unique constraint") {
			switch model {
				case "users":
					return ErrEmailExists
				default:
			}
		}
	}

	return err
}