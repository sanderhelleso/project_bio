package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"../models"
	"fmt"
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
		invalidReqBodyRes(c)
		return
	}

	user := models.User {
		Email: 		c.PostForm("email"),
		Password:	c.PostForm("password"),
	}

	// attempt to create and store user in DB
	err := u.us.Create(&user); if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H {
			"status": http.StatusInternalServerError,
			"message": "Something went wrong when attempting to signup",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H {
		"status": http.StatusCreated,
		"message": "Signup successfull!",
	})
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
		invalidReqBodyRes(c)
		return
	}

	// attempt to authenticate user
	user, err := u.us.Authenticate(c.PostForm("email"), c.PostForm("password"))
	if err != nil {
		switch err {
			case models.ErrNotFound:
				c.JSON(http.StatusUnprocessableEntity, gin.H {
					"status": http.StatusUnprocessableEntity,
					"message": "The email provided was invalid",
				})
			case models.ErrInvalidPassword:
				c.JSON(http.StatusUnprocessableEntity, gin.H {
					"status": http.StatusUnprocessableEntity,
					"message": "The password provided was invalid",
				})
			default:
				internalServerErrRes(c)
		}
		return
	}

	fmt.Printf("Successfully authenticated user %v...\n", user)
	c.JSON(http.StatusFound, gin.H {
		"status": http.StatusFound,
		"message": "Login successfull!",
	})
}

// internalServerErrRes sends back response message about an,
// internal server error with the status code of 500
func internalServerErrRes(c *gin.Context) {
	c.JSON(http.StatusInternalServerError, gin.H {
		"status": http.StatusInternalServerError,
		"message": "Something went wrong when performing action",
	})
}

// invalidReqBodyRes sends back response message, notifying
// users about the error that there was problems with req body
func invalidReqBodyRes(c *gin.Context) {
	c.JSON(http.StatusUnprocessableEntity, gin.H {
		"status": http.StatusUnprocessableEntity,
		"message": "Unable to process form data due to invalid format",
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