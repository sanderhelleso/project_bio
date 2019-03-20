package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"../models"
	"../lib/response"
	"strconv"
)

/*UserID			uint `gorm:"not null;index"`
	UserFollowingID uint `gorm:"not null;index"`
	CreatedAt  time.Time*/

// FollowForm represents the request body to the endpoint /follow.
// FollowForms structure is be used for both creation & delete
type FollowForm struct {
	UserID 			string `form:"userID" binding:"required, numeric"`
	UserFollowingID string `form:"userFollowingID" binding:"required, numeric"`
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
// ROUTE:	/follow
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
	if err != nil {
		return
	}

	userFollowingID, err := ParseUserID(c.PostForm("userFollowingID"), c)
	if err != nil {
		return
	}

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

// Delete is used to delete a user with a
// given user id (uid) from the application
//
// METHOD: 	DELETE
// ROUTE:	/delete
//
//BODY:		DeleteForm
func (u *Users) Delete(c *gin.Context) {

	var form DeleteForm
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
		return
	}

	// attempt to delete user with uid and its data from db
	uid, _ := strconv.Atoi(c.PostForm("uid"))
	err := u.us.Delete(uint(uid)); if err != nil {
		response.RespondWithError(
			c, 
			http.StatusInternalServerError, 
			"Something went wrong when attempting to delete your account")
		return
	}

	response.RespondWithSuccess(
		c,
		http.StatusOK,
		"Account successfully deleted")
}