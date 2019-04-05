package controllers

import (
	"../models"
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
// /promos/products/delete
type PromoProductFormWithID struct {
	ID 	uint `form:"id" binding:"required"`
}

// PromoProducts represents the controller for a promo product
type PromoProducts struct {
	pss models.PromoProductService
	is 	models.ImageService
}

// NewPromoProducts is used to create a new promo product controller
func NewPromoProducts(pps models.PromoProductService, is models.ImageService) *PromoProducts {
	return &PromoProducts {
		pps,
		is,
	}
}


