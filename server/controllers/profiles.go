package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"../models"
	"../lib/response"
	"../lib/parser"
	"fmt"
	"os"
	"io"
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

	// get uploaded file
	blob, _ := c.FormFile("avatar")
	file, err := blob.Open()
	if err != nil {
		response.RespondWithError(
			c, 
			http.StatusInternalServerError, 
			"OPEN FILE: Something went wrong when uploading image. Please try again.")
		return
	}
	defer file.Close()

	// create dir path for avatar
	avatarPath := fmt.Sprintf("images/avatars/%v/", 1)
	err = os.MkdirAll(avatarPath, 0755)
	if err != nil {
		response.RespondWithError(
			c, 
			http.StatusInternalServerError, 
			"MAKE DIR: Something went wrong when uploading image. Please try again.")
		return
	}

	// create destination file
	dst, err := os.Create(avatarPath + blob.Filename)
	if err != nil {
		response.RespondWithError(
			c, 
			http.StatusInternalServerError, 
			"CREATE DEST FILE: Something went wrong when uploading image. Please try again.")
		return
	}
	defer dst.Close()

	// copy uplaoded file data to destination file
	_, err = io.Copy(dst, file)
	if err != nil {
		response.RespondWithError(
			c, 
			http.StatusInternalServerError, 
			"COPY DATA: Something went wrong when uploading image. Please try again.")
		return
	}

	response.RespondWithSuccess(
		c,
		http.StatusCreated,
		"Avatar successfully uploaded!")
}