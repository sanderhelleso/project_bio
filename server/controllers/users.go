package controllers

import (
	"fmt"
	"net/http"

	"../email"
	"../lib/jwt"
	"../lib/response"
	"../models"
	"github.com/gin-gonic/gin"
)

// AuthForm represents the request body to the endpoint /signup and /login.
type AuthForm struct {
	Email    string `form:"email" binding:"required"`
	Password string `form:"password" binding:"required"`
}

// DeleteUserForm represents the request body to the endpoint /delete
type DeleteUserForm struct {
	ID uint `form:"userID" binding:"required"`
}

// ForgotPwForm is used to proccess the forgot password
// form and init the reset proccess
type ForgotPwForm struct {
	Email string `form:"email" binding:"required"`
}

// ResetPwForm is used to proccess the forgot password
// form and the reset password form
type ResetPwForm struct {
	Password string `form:"password" binding:"required"`
	Token    string `form:"token" binding:"required"`
}

// VerifyAccForm is used to proccess the verify account
// form and complete the account verification proccess
type VerifyAccForm struct {
	Token string `form:"token" binding:"required"`
}

// Users represents the controller for a user in the app
type Users struct {
	us      models.UserService
	emailer *email.Client
}

// NewUsers is used to create a new User controller
func NewUsers(us models.UserService, emailer *email.Client) *Users {
	return &Users{
		us,
		emailer,
	}
}

// Login is used to verify the provided email address and password
// and then log the user in if the provided info is correct,
// If the user was not found in our system, we create a new account
// and logs the user in
//
// METHOD: 	POST
// ROUTE:	/login
//
// BODY:	LoginForm
func (u *Users) Login(c *gin.Context) {

	var form AuthForm
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c,
			http.StatusUnprocessableEntity,
			"Unable to process form data due to invalid format")
		return
	}

	newUser := false
	message := response.SuccessLoginExtUser

	// attempt to authenticate user
	user, err := u.us.Authenticate(form.Email, form.Password)
	if err != nil {

		// if unable to authenticate, we create a new account for the user
		// and then logs them in with the newly created user
		if err == models.ErrNotFound {

			// attempt to create and store user in DB
			user = &models.User{
				Email:    form.Email,
				Password: form.Password,
				Verified: false,
			}

			if err := u.us.Create(user); err != nil {

				code := http.StatusBadRequest
				if err == models.ErrEmailExists {
					code = http.StatusConflict
				}

				response.RespondWithError(
					c,
					code,
					err.Error())
				return
			}

			// generate verification token
			token, _ := u.us.InitiateVerification(form.Email)
			fmt.Println("TOKEN: ------------- :")
			fmt.Println(token)

			// send welcome email with verification token
			go u.emailer.Welcome(user.Email, token)
			newUser = true
			message = response.SuccessLoginNewUser

		} else {
			response.RespondWithError(
				c,
				http.StatusUnprocessableEntity,
				err.Error())
			return
		}
	}

	// generate valid JWT
	token, err := jwt.GenerateJWT(user)

	if err != nil {
		response.RespondWithError(
			c,
			http.StatusUnprocessableEntity,
			"Something went wrong when performing action")
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  http.StatusOK,
		"message": message,
		"token":   token,
		"newUser": newUser,
	})
}

// Delete is used to delete a user with a
// given user id (uid) from the application
//
// METHOD: 	DELETE
// ROUTE:	/delete
//
//BODY:		DeleteForm
func (u *Users) Delete(c *gin.Context) {

	var form DeleteUserForm
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c,
			http.StatusUnprocessableEntity,
			"Unable to process form data due to invalid format")
		return
	}

	// attempt to delete user with uid and its data from db
	err := u.us.Delete(form.ID)
	if err != nil {
		response.RespondWithError(
			c,
			http.StatusInternalServerError,
			"Something went wrong when attempting to delete your account. Please try again")
		return
	}

	response.RespondWithSuccess(
		c,
		http.StatusOK,
		"Account successfully deleted")
}

// InitiateReset initiates the reset password functionality
// POST /forgot
func (u *Users) InitiateReset(c *gin.Context) {
	var form ForgotPwForm
	if err := c.Bind(&form); err != nil {
		response.RespondWithError(
			c,
			http.StatusUnprocessableEntity,
			err.Error())
		return
	}

	token, err := u.us.InitiateReset(form.Email)
	if err != nil {
		response.RespondWithError(
			c,
			http.StatusUnprocessableEntity,
			err.Error())
		return
	}

	go u.emailer.ResetPw(form.Email, token)
	response.RespondWithSuccess(
		c,
		http.StatusOK,
		"An email containing instructions has been sent to the provided email address")
}

// CompleteReset processes the reset password form
// POST /reset
func (u *Users) CompleteReset(c *gin.Context) {
	var form ResetPwForm
	if err := c.Bind(&form); err != nil {
		response.RespondWithError(
			c,
			http.StatusUnprocessableEntity,
			err.Error())
		return
	}

	user, err := u.us.CompleteReset(form.Token, form.Password)
	if err != nil {
		response.RespondWithError(
			c,
			http.StatusUnprocessableEntity,
			err.Error())
		return
	}

	// TODO: login user by sendig back user data
	c.JSON(http.StatusFound, gin.H{
		"status":  http.StatusOK,
		"message": "Password has been succesfully updated!",
		"payload": user, // <--- update this to include profile
	})
}

// CompleteVerification processes the verify account form
// POST /verify
func (u *Users) CompleteVerification(c *gin.Context) {
	var form VerifyAccForm
	if err := c.Bind(&form); err != nil {
		response.RespondWithError(
			c,
			http.StatusUnprocessableEntity,
			err.Error())
		return
	}

	user, err := u.us.CompleteVerification(form.Token)
	if err != nil {
		response.RespondWithError(
			c,
			http.StatusUnprocessableEntity,
			err.Error())
		return
	}

	// TODO: login user by sendig back user data
	c.JSON(http.StatusFound, gin.H{
		"status":  http.StatusOK,
		"message": "Account has been succesfully verified!",
		"payload": user, // <--- update this to include profile
	})
}
