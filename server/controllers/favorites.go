package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"../models"
	"../lib/response"
)

// FavoriteForm represents the request body to the endpoints '...'
type FavoriteForm struct {
	UserID 	uint `form:"userID" binding:"required"`
	PromoID	uint `form:"promoID" binding:"required"`
}

// Favorites represents the controller for a favorite between a user and promotion
type Favorites struct {
	fs models.FavoriteService
}

// NewFavorites is used to create a new Favorites controller
func NewFavorites(fs models.FavoriteService) *Favorites {
	return &Favorites {
		fs,
	}
}

// Create creates a new favorite releationship 
// between provided userID and promoID
func (f *Favorites) Create(c *gin.Context) {

	var form FavoriteForm
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
		return
	}

	favorite := models.Favorite {
		UserID: form.UserID,
		PromoID: form.PromoID,
	}

	// attempt to create and store favorite in DB
	if err := f.fs.Create(&favorite); err != nil {
		response.RespondWithError(
			c, 
			http.StatusBadRequest, 
			err.Error())
		return
	}

	response.RespondWithSuccess(
		c,
		http.StatusCreated,
		"Favorited promotion successfully!")
}

// Check checks if there exists a favorite releationship 
// between passed in userID and promoID
func (f *Favorites) Check(c *gin.Context) {

	var form FavoriteForm
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
		return
	}

	var found bool
	if err := f.fs.ByUserAndPromoID(form.UserID, form.PromoID); err == nil {
		found = true
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  http.StatusOK,
		"payload": found,
	})
}

// Delete removes a favorite releationship 
// between provided userID and promoID
func (f *Favorites) Delete(c *gin.Context) {

	var form FavoriteForm
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
		return
	}

	// attempt to create and store favorite in DB
	if err := f.fs.Delete(form.UserID, form.PromoID); err != nil {
		response.RespondWithError(
			c, 
			http.StatusBadRequest, 
			err.Error())
		return
	}

	response.RespondWithSuccess(
		c,
		http.StatusCreated,
		"Unfavorited successfully!")
}
