package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"../models"
	"../lib/response"
	"../lib/parser"
)

// FollowingForm represents the request body to the endpoint /followers.
// FollowForms structure is be used for both creation & delete
type FollowingForm struct {
	UserID 			string `form:"userID" binding:"required"`
	UserFollowingID string `form:"userFollowingID" binding:"required"`
}

// FollowerForm represents the request body to the endpoints
// /followers/all - /followes/delete - /followers/following
type FollowerForm struct {
	UserID 			string `form:"userID"`
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

	userID, err := parser.ParseUserID(c.PostForm("userID"))
	if err != nil { return }

	userFollowingID, err := parser.ParseUserID(c.PostForm("userFollowingID"))
	if err != nil { return }

	follow := models.Follower {
		UserID: 		 userID,
		UserFollowingID: userFollowingID,
	}

	// attempt to create and store user in DB
	if err := f.fs.Create(&follow); err != nil {
		response.RespondWithError(
			c, 
			http.StatusInternalServerError, 
			"Something went wrong when attempting to follow user")
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

	// attempt to delete user with uid and its data from db
	userID, err := parser.ParseUserID(c.PostForm("userID"))
	if err != nil { return  }

	err = f.fs.Delete(userID); if err != nil {
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

	userID, err := parser.ParseUserID(c.Param("userID"))
	if err != nil { return }

	// attempt to create and store user in DB
	followers, err := f.fs.ByUserID(userID)
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

	userID, err := parser.ParseUserID(c.Param("userID"))
	if err != nil { return }

	// attempt to create and store user in DB
	following, err := f.fs.ByUserFollowingID(userID)
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