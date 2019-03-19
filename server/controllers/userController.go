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

	// validate form data
	var form SignupForm
	if c.Bind(&form) != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H {
			"status": http.StatusUnprocessableEntity,
			"message": "Unable to process form data due to invalid format",
		})
		return
	}

	// create user struct
	user := models.User {
		Email: c.PostForm("email"),
	}

	// attempt to create and store user in DB
	err := u.us.Create(&user); if err != nil {

		// if any error occured, send back 500 (internal server error)
		c.JSON(http.StatusInternalServerError, gin.H {
			"status": http.StatusInternalServerError,
			"message": "Something went wrong when attempting to signup",
		})
		return
	}

	// send back status created (201)
	c.JSON(http.StatusCreated, gin.H {
		"status": http.StatusCreated,
		"message": "Signup successfull!",
	})
}

// SignupForm represents the request body
// to the endpoint /signup. 
type SignupForm struct {
	Email string `form:"email" binding:"required"`
}

// UserController represents the controller
// for a user in the application
type UserController struct {
	us *models.UserService
}