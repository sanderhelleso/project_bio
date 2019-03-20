package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"../models"
	"../lib/response"
)

// FollowForm represents the request body to the endpoint /follow.
// FollowForms structure is be used for both creation & delete
type FollowForm struct {
	UserID 			string `form:"userID" binding:"required"`
	UserFollowingID string `form:"userFollowingID" binding:"required"`
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
// ROUTE:	/follow/new
//
// BODY:	FollowForm
func (f *Followers) Create(c *gin.Context) {

	var form FollowForm
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
		return
	}

	userID, err := ParseUserID(c.PostForm("userID"), c)
	if err != nil { return }

	userFollowingID, err := ParseUserID(c.PostForm("userFollowingID"), c)
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
// ROUTE:	/follow/unfollow
//
//BODY:		FollowForm
func (f *Followers) Delete(c *gin.Context) {

	var form FollowForm
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
		return
	}

	// attempt to delete user with uid and its data from db
	userID, err := ParseUserID(c.PostForm("userID"), c)
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