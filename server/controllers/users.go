package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"../models"
	"../lib/jwt"
	"../lib/response"
	"../email"
	"fmt"
)

// AuthForm represents the request body to the endpoint /signup and /login. 
type AuthForm struct {
	Email 			string `form:"email" binding:"required"`
	Password 		string `form:"password" binding:"required"`
}

// DeleteUserForm represents the request body to the endpoint /delete
type DeleteUserForm struct {
	ID 	uint `form:"userID" binding:"required"`
}

// Users represents the controller for a user in the app
type Users struct {
	us 		models.UserService
	emailer *email.Client
}

// NewUsers is used to create a new User controller
func NewUsers(us models.UserService, emailer *email.Client) *Users {
	return &Users {
		us,
		emailer,
	}
}

// Create is used to process the signup form
// when a suer subits the form. This is used to
// create a new user account for the application
//
// METHOD: 	POST
// ROUTE:	/signup
//
// BODY:	SignupForm
func (u *Users) Create(c *gin.Context) {

	var form AuthForm
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
		return
	}

	user := models.User {
		Email: 		form.Email,
		Password:	form.Password,
		Verified:	false,
	}

	// attempt to create and store user in DB
	if err := u.us.Create(&user); err != nil {

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

	err := u.emailer.Welcome("Testuser", user.Email)
	fmt.Println(err)
	response.RespondWithSuccess(
		c,
		http.StatusCreated,
		"Signup successfull!")
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
	err := u.us.Delete(form.ID); if err != nil {
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

// Login is used to verify the provided email address and password
// and then log the user in if the provided info is correct
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

	// attempt to authenticate user
	user, err := u.us.Authenticate(form.Email, form.Password)
	if err != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity,
			err.Error())
		return
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

	c.JSON(http.StatusFound, gin.H {
		"status": 	http.StatusFound,
		"message": 	"Login successfull!",
		"token":	token,
	})
}