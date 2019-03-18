package controllers

import (
	"github.com/gorilla/schema"
	"net/http"
	"../models"
	"../lib"
)

// Create is used to process the signuo form
// when a suer subits the form. This is used to
// create a new user account for the application
//
// METHOD: 	POST
// ROUTE:	/signup
//
// BODY:	SignupForm
func (u *UserController) Create(w http.ResponseWriter, req *http.Request) {

	// inti decoder
	dec := schema.NewDecoder()
	var form SignupForm

	// decode form
	err := dec.Decode(&form, req.PostForm)
	lib.Must(err)

	// create user struct
	user := models.User {
		Username: form.Username,
	}

	// attempt to create and store user in DB
	err = u.us.Create(&user); 
	if err != nil {

		// if any error occured, send back 500 (internal server error)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
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