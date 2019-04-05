package controllers

import (
	"../models"
	"github.com/gin-gonic/gin"
	"net/http"
	"../lib/response"
)


// PromoProductForm represents part of request body connected to a promo
// used in conjuction with Promo to the endpoint /promos.
type PromoProductForm struct {
	Name			string	  `form:"name" binding:"required"`
	Brand			string	  `form:"brand" binding:"required"`
	Link            string    `form:"link" binding:"required"`
	//Image			string    `form:"image" binding:"required"`
	Price			float64   `form:"price" binding:"required"`
	Currency		string    `form:"currency" binding:"required"`
}

// UpdatePromoProductForm represents the request body to the endpoint
// promos/products/update
// used in conjuction with Promo to the endpoint /promos.
type UpdatePromoProductForm struct {
	ID				uint      `form:"id" binding:"required"`
	Name			string	  `form:"name" binding:"required"`
	Brand			string	  `form:"brand" binding:"required"`
	Link            string    `form:"link" binding:"required"`
	Image			string    `form:"image" binding:"required"`
	Price			float64   `form:"price" binding:"required"`
	Currency		string    `form:"currency" binding:"required"`
}

// PromoProductFormWithID represents the request body to the endpoints
// /promos/products/delete & /promos/products/image
type PromoProductFormWithID struct {
	ID 	uint `form:"id" binding:"required"`
}

// PromoProducts represents the controller for a promo product
type PromoProducts struct {
	pps models.PromoProductService
	is 	models.ImageService
}

// NewPromoProducts is used to create a new promo product controller
func NewPromoProducts(pps models.PromoProductService, is models.ImageService) *PromoProducts {
	return &PromoProducts {
		pps,
		is,
	}
}

// ImageUpload handles uploading of a promo products image
func (pp *PromoProducts) ImageUpload(c *gin.Context) {
	promoProduct, err := pp.pps.ByID(1)
	if err != nil {
		uploadImageErr(c, err.Error())
		return
	}

	// get file from form
	f, _ := c.FormFile("promo")
	if f == nil {
		uploadImageErr(c, "Invalid file")
		return
	}

	// create image
	image, err := pp.is.CreatePromoProduct(promoProduct, f)
	if err != nil {
		uploadImageErr(c, err.Error())
		return
	}

	// update profile
	pp.pps.Update(promoProduct)

	c.JSON(http.StatusOK, gin.H{
		"status":  http.StatusCreated,
		"message": "Promo image successfully uploaded!",
		"payload": gin.H {
			"image": image,
		},
	})
}

// helper func to send error message releated to image upload
func uploadImageErr(c *gin.Context, errMsg string) {
	response.RespondWithError(
		c,
		http.StatusInternalServerError,
		errMsg,
	)
}

