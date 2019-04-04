package controllers

import (
	"github.com/gin-gonici/gin"
)

// PromoProductForm represents part of request body connected to a promo
// used in conjuction with Promo to the endpoint /promos.
type PromoProductForm struct {
	PromoID         uint 	  `form: "promo_id" binding:"required"`	
	ProductURL		string	  `form:"productURL" binding:"required"`
	Price			float64   `form:"price" binding:"required"`
	PercantageOff	uint	  `form:"percentageOff"`
	Currency		string    `form:"currency" binding:"required"`
}



