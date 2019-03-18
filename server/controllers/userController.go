package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"../models"
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

	// decode form
	un := c.PostForm("username")

	// create user struct
	user := models.User {
		Username: un,
	}

	// attempt to create and store user in DB
	err := u.us.Create(&user); if err != nil {

		// if any error occured, send back 500 (internal server error)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"message": "Something went wrong when attempting to signup",
		})
		return
	}

	// send back status created
	c.JSON(http.StatusCreated, gin.H{
		"status": http.StatusCreated,
		"message": "Signup successfull!",
	})
}

// SignupForm represents the request body
// to the endpoint /signup. 
//
// Params: username: string
type SignupForm struct {
	Username string `schema:"username"`
}

// UserController represents the controller
// for a user in the application
type UserController struct {
	us *models.UserService
}