package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
	"fmt"
	"../lib/parser"
	"../models"
	"../lib/response"
)

// PromoForm represents the request body to the endpoint /promos.
// PromoForms structure is used for create
type PromoForm struct {
	Title			string 	  	`form:"title" binding:"required"`
	Description		string	  	`form:"description" binding:"required"`
	Category		string 	  	`form:"category" binding:"required"`
	Code			string	  	`form:"promotion_code"`	
	Discount		uint	  	`form:"discount_amount"`	
	ExpiresAt		time.Time 	`form:"expires_at"`

	Products 		[]*PromoProductForm `form:"products" binding:"required"`
}

// UpdatePromoForm represents the request body to the endpoint /promos/update.
// UpdatePromoForms structure is used for update
type UpdatePromoForm struct {
	ID				uint      `form:"id" binding:"required"`
	Title			string 	  `form:"title" binding:"required"`
	Description		string	  `form:"description" binding:"required"`
	Category		string 	  	`form:"category" binding:"required"`
	Code			string	  `form:"promotion_code"`	
	Discount		uint	  `form:"discount_amount"`	
	ExpiresAt		time.Time `form:"expiresAt"`
}

// PromoFormWithID represents the request body to the endpoints
// /promos/delete and /promos/image
type PromoFormWithID struct {
	ID 	uint `form:"id" binding:"required"`
}

// Promos represents the controller for a promoer releationship in the app
type Promos struct {
	ps 	models.PromoService
	pps models.PromoProductService
	is 	models.ImageService
}

// NewPromos is used to create a new promoer controller
func NewPromos(
	ps models.PromoService, 
	pps models.PromoProductService, 
	is models.ImageService) *Promos {
	return &Promos {
		ps,
		pps,
		is,
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
		fmt.Println(fmt.Println(&form))
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
		return
	}

	// attempt to create and store promo in DB
	promo := models.Promo {
		UserID: 		parser.GetIDFromCTX(c),
		Title:			form.Title,
		Description:	form.Description,
		Category:		form.Category,
		Code:			form.Code,
		Discount:		form.Discount,
		ExpiresAt:		form.ExpiresAt,
	}

	// create promo
	promoID, err := p.ps.Create(&promo)
	if err != nil {
		fmt.Println(err)
		response.RespondWithError(
			c, 
			http.StatusInternalServerError, 
			err.Error())
		return
	}

	// create products connected to created promo
	promoProcutIDs := make([]uint, 0)
	for _, product := range form.Products {

		promoProduct := models.PromoProduct {
			PromoID: 	promoID,
			Name:		product.Name,
			Brand:		product.Brand,
			Link:		product.Link,
			Price:		product.Price,
			Currency:	product.Currency,
		}

		/*// get file from form
		f, _ := c.FormFile("image")

		// create and store product image
		if err := p.is.CreatePromoProduct(&promoProduct, f); err != nil {
			response.RespondWithError(
				c, 
				http.StatusInternalServerError, 
				err.Error())
			return
		}*/

		if err := p.pps.Create(&promoProduct); err != nil {
			response.RespondWithError(
				c, 
				http.StatusInternalServerError, 
				err.Error())
			return
		}

		promoProcutIDs = append(promoProcutIDs, promoProduct.ID)
	}

	c.JSON(http.StatusCreated, gin.H {
		"message": 	"Promo successfully created",
		"status": 	http.StatusCreated,
		"payload": 	promoProcutIDs,
	})
}

// Update is used to process the promo form
// when a usuer subits the form. This is used to
// update a existing promo for a product owned by a user
//
// METHOD: 	PUT
// ROUTE:	/promos/update
//
// BODY:	PromoForm
func (p *Promos) Update(c *gin.Context) {

	var form UpdatePromoForm
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
		return
	}

	// attempt to update and store promo in DB
	promo := models.Promo {
		Title:			form.Title,
		Description:	form.Description,
		Code:			form.Code,
		Discount:		form.Discount,
		ExpiresAt:		form.ExpiresAt,
	}

	if err := p.ps.Update(&promo); err != nil {
		response.RespondWithError(
			c, 
			http.StatusInternalServerError, 
			"Something went wrong when attempting to update promo. Please try again")
		return
	}

	c.JSON(http.StatusInternalServerError, gin.H {
		"message": 	"Promo successfully updated",
		"status": 	http.StatusInternalServerError,
		"payload": 	promo,
	})
}

// Delete is used to delete a promo identified
// by the passed in promo id
//
// METHOD: 	DELETE
// ROUTE:	/promos/delete
//
// BODY:	PromoID
func (p *Promos) Delete (c *gin.Context) {

	var form PromoFormWithID
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
		return
	}

	err := p.ps.Delete(form.ID); if err != nil {
		response.RespondWithError(
			c, 
			http.StatusInternalServerError, 
			"Something went wrong when attempting to delete promo Please try again")
		return
	}

	response.RespondWithSuccess(
		c,
		http.StatusOK,
		"Promo succesfully removed!")
}

// PromoUpload handle uploading of a promos image
/*func (p *Promos) PromoUpload(c *gin.Context) {

	// get file from form
	f, _ := c.FormFile("image")

	var form PromoFormWithID
	if c.Bind(&form) != nil || f == nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
		return
	}

	// find promo releated to id
	promo, err := p.ps.ByID(form.ID)
	if err != nil {
		uploadPromoErr(c, err.Error())
		return
	}

	// create promo
	err = pps.is.CreatePromoProduct(promo, f)
	if err != nil {
		uploadPromoErr(c, err.Error())
		return
	}

	// update promo
	p.ps.Update(promo)
	response.RespondWithSuccess(
		c,
		http.StatusCreated,
		"Promo image successfully uploaded!",
	)
}

// helper func to send error message releated to promo upload
func uploadPromoErr(c *gin.Context, errMsg string) {
	response.RespondWithError(
		c, 
		http.StatusInternalServerError, 
		errMsg,
	)
}*/