package controllers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
	"../models"
	"../lib/response"
)

// PromoForm represents the request body to the endpoint /promos.
// PromoForms structure is be used for creation and update
type PromoForm struct {
	UserID 			string    `form:"userID" binding:"required"`
	Title			string 	  `form:"title" binding:"required"`
	Brand			string 	  `form:"brand" binding:"required"`
	Description		string	  `form:"description"`
	imageURL		string	  `form:"imageURL"`
	Price			float32   `form:"price"`
	Currency		float32   `form:"currency"`
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

	fmt.Println(form)

	/*promo := models.Promo {
		UserID			uint 	`gorm:"not null"`
		Title			string 	`gorm:"not null;size:100"`
		Brand			string 	`gorm:"not null;size:100"`
		Description		string	
		imageURL		string	
		Price			float32 
		PercantageOff	int	
		ExpiredAt		time.Time
	}

	// attempt to create and store user in DB
	if err := f.fs.Create(&follow); err != nil {
		response.RespondWithError(
			c, 
			http.StatusInternalServerError, 
			"Something went wrong when attempting to follow user")
		return
	}*/

	response.RespondWithSuccess(
		c,
		http.StatusCreated,
		"Follow successfull!")
}