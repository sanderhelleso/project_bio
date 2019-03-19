package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"../models"
	"fmt"
	"../lib/jwt"
	"../lib/response"
)

// NewUserController is used to create a new User controller
func NewUserController(us *models.UserService) *UserController {
	return &UserController {
		us: us,
	}
}

// Create is used to process the signuo form
// when a suer subits the form. This is used to
// create a new user account for the application
//
// METHOD: 	POST
// ROUTE:	/signup
//
// BODY:	SignupForm
func (u *UserController) Create(c *gin.Context) {

	var form SignupForm
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
		return
	}

	user := models.User {
		Email: 		c.PostForm("email"),
		Password:	c.PostForm("password"),
	}

	// attempt to create and store user in DB
	err := u.us.Create(&user); if err != nil {
		response.RespondWithError(
			c, 
			http.StatusInternalServerError, 
			"Something went wrong when attempting to signup")
		return
	}

	response.RespondWithSuccess(
		c,
		http.StatusCreated,
		"Signup successfull!")
}

// Login is used to verify the provided email address and password
// and then log the user in if the provided info is correct
//
// METHOD: 	POST
// ROUTE:	/login
//
// BODY:	LoginForm
func (u *UserController) Login(c *gin.Context) {

	var form LoginForm
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
		return
	}

	// attempt to authenticate user
	user, err := u.us.Authenticate(c.PostForm("email"), c.PostForm("password"))
	if err != nil {
		switch err {
			case models.ErrNotFound:
				response.RespondWithError(
					c, 
					http.StatusUnprocessableEntity,
					"The email provided was invalid")
			case models.ErrInvalidPassword:
				response.RespondWithError(
					c, 
					http.StatusUnprocessableEntity,
					"The password provided was invalid")
			default:
				response.RespondWithError(
					c, 
					http.StatusUnprocessableEntity,
					"Something went wrong when performing action")
		}
		return
	}

	// generate valid JWT
	validToken, err := jwt.GenerateJWT(user.ID)
	if err != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity,
			"Something went wrong when performing action")
		return
	}

	fmt.Printf("Successfully authenticated user %v...\n", user)
	c.JSON(http.StatusFound, gin.H {
		"status": 	http.StatusFound,
		"message": 	"Login successfull!",
		"token":	validToken,
	})
}

// SignupForm represents the request body to the endpoint /signup. 
type SignupForm struct {
	Email 		string `form:"email" binding:"required"`
	Password 	string `form:"password" binding:"required"`
}

// LoginForm represents the request body to the endpoint /login 
type LoginForm struct {
	Email 		string `form:"email" binding:"required"`
	Password 	string `form:"password" binding:"required"`
}

// UserController represents the controller for a user in the app
type UserController struct {
	us *models.UserService
}