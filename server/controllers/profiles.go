package controllers

import (
	"net/http"

	"fmt"

	"../lib/parser"
	"../lib/response"
	"../models"
	"github.com/gin-gonic/gin"
)

// ProfileForm represents the request body to the endpoint /new and /update
type ProfileForm struct {
	Handle       string `form:"handle" binding:"required"`
	Name         string `form:"name" binding:"required"`
	Bio          string `form:"bio"`
	InstagramURL string `form:"instagramURL"`
	Avatar       string `form:"avatar"`
}

// DeleteProfileForm represents the request body to the endpoint /delete
type DeleteProfileForm struct {
	ID uint `form:"userID" binding:"required"`
}

// Profiles represents the controller for a profile in the app
type Profiles struct {
	ps models.ProfileService
	is models.ImageService
}

// NewProfiles is used to create a new Profile controller
func NewProfiles(ps models.ProfileService, is models.ImageService) *Profiles {
	return &Profiles{
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

	profile := models.Profile{
		UserID:       parser.GetIDFromCTX(c),
		Handle:       form.Handle,
		Name:         form.Name,
		Bio:          form.Bio,
		InstagramURL: form.InstagramURL,
		Avatar:       form.Avatar,
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
	if f == nil {
		fmt.Println(f)
		uploadAvatarErr(c, "Invalid file")
		return
	}

	// create avatar
	avatar, err := p.is.CreateAvatar(profile, f)
	if err != nil {
		uploadAvatarErr(c, err.Error())
		return
	}

	// update profile
	p.ps.Update(profile)

	c.JSON(http.StatusOK, gin.H{
		"status":  http.StatusCreated,
		"message": "Avatar successfully uploaded!",
		"payload": gin.H{
			"avatar": avatar,
		},
	})
}

// helper func to send error message releated to avatar upload
func uploadAvatarErr(c *gin.Context, errMsg string) {
	response.RespondWithError(
		c,
		http.StatusInternalServerError,
		errMsg,
	)
}

// ByUserID fetches the profile data for a logged in user
// where the ID is retrieved from the token
func (p *Profiles) ByUserID(c *gin.Context) {

	profile := &models.Profile{
		UserID: parser.GetIDFromCTX(c),
	}

	profile, err := p.ps.ByUserID(parser.GetIDFromCTX(c))
	if err != nil {
		response.RespondWithError(
			c,
			http.StatusInternalServerError,
			"Unable to find profile for given user ID")
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  http.StatusOK,
		"message": "Profile successfully fetched!",
		"payload": gin.H{
			"profile": profile,
		},
	})
}

// ByHandle fetches the profile data for a user
// matching the provided handle
func (p *Profiles) ByHandle(c *gin.Context) {

	// fetch required params
	q := c.Request.URL.Query()
	handle := q["handle"][0] // handle of profile

	// attempt to load profile with provided handle
	profile, err := p.ps.ByHandle(handle)

	if err != nil {
		response.RespondWithError(
			c,
			http.StatusNotFound,
			fmt.Sprintf("Could not find any profiles with the handle: %s", handle))
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  http.StatusOK,
		"message": "Profile successfully fetched!",
		"payload": profile,
	})
}
