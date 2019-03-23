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
	Avatar			string	`form:"avatar"`
}

// DeleteProfileForm represents the request body to the endpoint /delete
type DeleteProfileForm struct {
	ID 	uint `form:"userID" binding:"required"`
}

// Profiles represents the controller for a profile in the app
type Profiles struct {
	ps models.ProfileService
	is models.ImageService
}

// NewProfiles is used to create a new Profile controller
func NewProfiles(ps models.ProfileService, is models.ImageService) *Profiles {
	return &Profiles {
		ps,
		is,
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
		Avatar:			form.Avatar,
	}

	if err := p.ps.Create(&profile); err != nil {
		response.RespondWithError(
			c, 
			http.StatusInternalServerError, 
			"Something went wrong when creating profile. Please try again.")
		return
	}

	response.RespondWithSuccess(
		c,
		http.StatusCreated,
		"Profile successfully created!")
}

// AvatarUpload handle uploading of a users avatar
func (p *Profiles) AvatarUpload(c *gin.Context) {
	profile, err := p.ps.ByUserID(parser.GetIDFromCTX(c))
	if err != nil {
		uploadAvatarErr(c, err.Error())
		return
	}

	// get file from form
	f, _ := c.FormFile("avatar")

	// create avatar
	err = p.is.CreateAvatar(profile, f)
	if err != nil {
		uploadAvatarErr(c, err.Error())
		return
	}

	// update profile
	p.ps.Update(profile)
	response.RespondWithSuccess(
		c,
		http.StatusCreated,
		"Avatar successfully uploaded!",
	)
}

// helper func to send error message releated to avatar upload
func uploadAvatarErr(c *gin.Context, errMsg string) {
	response.RespondWithError(
		c, 
		http.StatusInternalServerError, 
		errMsg,
	)
}