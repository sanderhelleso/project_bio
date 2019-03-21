package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"../models"
	"../lib/response"
	"../lib/parser"
)

// ProfileForm represents the request body to the endpoint /new and /update 
type ProfileForm struct {
	Handle			string  `form:"handle" binding:"required"`
	Name	    	string 	`form:"name" binding:"required"`
	Bio		    	string 	`form:"bio"`
	InstagramURL	string  `form:"instagramURL"`
}

// DeleteProfileForm represents the request body to the endpoint /delete
type DeleteProfileForm struct {
	ID 	uint `form:"userID" binding:"required"`
}

// Profiles represents the controller for a profile in the app
type Profiles struct {
	ps models.ProfileService
}

// NewProfiles is used to create a new Profile controller
func NewProfiles(ps models.ProfileService) *Profiles {
	return &Profiles {
		ps,
	}
}

// Create is used to proccess the new profile form
// and create a new profile for an existing user
//
// METHOD: 	POST
// ROUTE:	/new
//
// BODY:	ProfileForm
func (p *Profiles) Create(c *gin.Context) {

	var form ProfileForm
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
		return
	}

	profile := models.Profile {
		UserID:			parser.GetIDFromCTX(c),	
		Handle:			form.Handle,
		Name:	    	form.Name,
		Bio:			form.Bio,
		InstagramURL:	form.InstagramURL,
	}

	if err := p.ps.Create(&profile); err != nil {
		response.RespondWithError(
			c, 
			http.StatusConflict, 
			err.Error())
		return
	}

	response.RespondWithSuccess(
		c,
		http.StatusCreated,
		"Profile successfully created!")
}