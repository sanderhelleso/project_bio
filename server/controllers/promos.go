package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
	"../models"
	"../lib/response"
)

// PromoForm represents the request body to the endpoint /promos.
// PromoForms structure is be used for creation and update
type PromoForm struct {
	UserID 			uint      `form:"userID" binding:"required"`
	Title			string 	  `form:"title" binding:"required"`
	Brand			string 	  `form:"brand" binding:"required"`
	Description		string	  `form:"description"`
	ImageURL		string	  `form:"imageURL"`
	ProductURL		string	  `form:"productURL"`
	Price			float32   `form:"price"`
	Currency		string    `form:"currency"`
	PercantageOff	int		  `form:"percentageOff"`
	ExpiresAt		time.Time `form:"expiresAt"`
}

// DeletePromoForm represents the request body to the endpoints
// /promos/delete
type DeletePromoForm struct {
	UserID 			string `form:"userID"`
}

// Promos represents the controller for a promoer releationship in the app
type Promos struct {
	ps models.PromoService
}

// NewPromos is used to create a new promoer controller
func NewPromos(ps models.PromoService) *Promos {
	return &Promos {
		ps,
	}
}


// Create is used to process the promo form
// when a usuer subits the form. This is used to
// create a new promo for a product owned by a user
//
// METHOD: 	POST
// ROUTE:	/promos/new
//
// BODY:	PromoForm
func (p *Promos) Create(c *gin.Context) {

	var form PromoForm
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
		return
	}

	// attempt to create and store promo in DB
	promo := models.Promo {
		UserID: 		form.UserID,
		Title:			form.Title,
		Brand:			form.Brand,
		Description:	form.Description,
		ImageURL:		form.ImageURL,
		ProductURL:		form.ProductURL,
		Price:			form.Price,
		Currency:		form.Currency,
		PercantageOff:	form.PercantageOff,
		ExpiresAt:		form.ExpiresAt,
	}

	if err := p.ps.Create(&promo); err != nil {
		response.RespondWithError(
			c, 
			http.StatusInternalServerError, 
			"Something went wrong when attempting to create promo")
		return
	}


	response.RespondWithSuccess(
		c,
		http.StatusCreated,
		"Promo successfully created")
}