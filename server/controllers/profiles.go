package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"image/jpeg"
	_ "image/png"
	"../models"
	"../lib"
	"../lib/response"
	"../lib/parser"
	"fmt"
	"os"
	"path/filepath"
	"strings"
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
	profile, err := p.ps.ByUserID(parser.GetIDFromCTX(c))
	if err != nil {
		response.RespondWithError(
			c, 
			http.StatusInternalServerError, 
			"Unable to find the profiles releated user. Please try to re-login and try again",
		)
		return
	}

	// get uploaded file
	fHeader, _ := c.FormFile("avatar")
	err := lib.ValidateExtension(fHeader.Filename)
	if err != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			err.Error(),
		)
		return
	}

	file, err := fHeader.Open()
	if err != nil {
		uploadAvatarErr(c)
		return
	}
	defer file.Close()

	// create dir path for avatar
	avatarPath := fmt.Sprintf("images/avatars/%v/", profile.UserID)
	err = os.MkdirAll(avatarPath, 0755)
	if err != nil {
		uploadAvatarErr(c)
		return
	}

	// create destination file
	dst, err := os.Create(avatarPath + "avatar.jpg")
	if err != nil {
		uploadAvatarErr(c)
		return
	}
	defer dst.Close()


	// rezise file
	new, err := lib.ResizeImg(150, 150, file)
	if err != nil {
		uploadAvatarErr(c)
		return
	}
	
	// store avatar in users path
	err = jpeg.Encode(dst, new, nil)
	if err != nil {
		uploadAvatarErr(c)
		return
	}

	// update profile
	profile.Avatar = avatarPath + "avatar.jpg"
	p.ps.Update(profile)

	response.RespondWithSuccess(
		c,
		http.StatusCreated,
		"Avatar successfully uploaded!",
	)


}

// helper func to send error message releated to avatar upload
func uploadAvatarErr(c *gin.Context) {
	response.RespondWithError(
		c, 
		http.StatusInternalServerError, 
		"Something went wrong when uploading image. Please try again.",
	)
}