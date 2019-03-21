package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"../models"
	"../lib/response"
)

// FollowingForm represents the request body to the endpoint /followers.
// FollowForms structure is be used for both creation & delete
type FollowingForm struct {
	UserID 			uint `form:"userID" binding:"required"`
	UserFollowingID uint `form:"userFollowingID" binding:"required"`
}

// FollowerForm represents the request body to the endpoints
// /followers/all - /followes/delete - /followers/following
type FollowerForm struct {
	UserID	uint `form:"userID"`
}

// Followers represents the controller for a follower releationship in the app
type Followers struct {
	fs models.FollowerService
}

// NewFollowers is used to create a new Follower controller
func NewFollowers(fs models.FollowerService) *Followers {
	return &Followers {
		fs,
	}
}

// Create is used to process the follower form
// when a uuer subits the form. This is used to
// create a new user follower releatonship
// UserID -> Follows -> UserFollowingID -> Do not follow -> UserID
//
// METHOD: 	POST
// ROUTE:	/followers/create
//
// BODY:	FollowForm
func (f *Followers) Create(c *gin.Context) {

	var form FollowingForm
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
		return
	}

	follow := models.Follower {
		UserID: 		 form.UserFollowingID,
		UserFollowingID: form.UserFollowingID,
	}

	// attempt to create and store follower in DB
	if err := f.fs.Create(&follow); err != nil {
		response.RespondWithError(
			c, 
			http.StatusBadRequest, 
			err.Error())
		return
	}

	response.RespondWithSuccess(
		c,
		http.StatusCreated,
		"Follow successfull!")
}

// Delete is used to delete a follower releationship
// with the given following ids defining the releationship
//
// METHOD: 	DELETE
// ROUTE:	/followers/delete
//
//BODY:		FollowForm
func (f *Followers) Delete(c *gin.Context) {

	var form FollowerForm
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
		return
	}

	err := f.fs.Delete(form.UserID); if err != nil {
		response.RespondWithError(
			c, 
			http.StatusInternalServerError, 
			"Something went wrong when attempting to unfollow user")
		return
	}

	response.RespondWithSuccess(
		c,
		http.StatusOK,
		"User succesfully unfollowed!")
}

// ByUserID is used to fetch all users that the provided
// user with id is following
//
// METHOD: 	GET
// ROUTE:	/following/is
//
// BODY:	FollowForm
func (f *Followers) ByUserID(c *gin.Context) {

	var form FollowerForm
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
		return
	}

	followers, err := f.fs.ByUserID(form.UserID)
	if err != nil {
		response.RespondWithError(
			c, 
			http.StatusInternalServerError, 
			"Something went wrong while attempting to fetch followers")
		return
	}

	response.RespondWithSuccessAndSlice(
		c,
		http.StatusOK,
		"Users following successfully fetched",
		followers)
}

// ByUserFollowingID is used to fetch all follower releationships
// where the userID passed in is following a different user
//
// METHOD: 	GET
// ROUTE:	/followers/have
//
// BODY:	FollowForm
func (f *Followers) ByUserFollowingID(c *gin.Context) {

	var form FollowerForm
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
		return
	}


	following, err := f.fs.ByUserFollowingID(form.UserID)
	if err != nil {
		response.RespondWithError(
			c, 
			http.StatusInternalServerError, 
			"Something went wrong while attempting to fetch followers")
		return
	}

	response.RespondWithSuccessAndSlice(
		c,
		http.StatusOK,
		"Followers successfully fetched",
		following)
}