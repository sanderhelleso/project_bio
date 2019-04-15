package controllers

import (
	"net/http"

	"../lib/response"
	"../models"
	"github.com/gin-gonic/gin"
)

// PromoCommentForm represents part of request body connected to a promo
// and endpoint /promos/comments/new
type PromoCommentForm struct {
	UserID  uint   `form:"userID" binding:"required"`
	PromoID uint   `form:"promoID" binding:"required"`
	Body    string `form:"body" binding:"required"`
}

// PromoCommentFormWithID represents the request body to the endpoint
// /promos/comments/delete
type PromoCommentFormWithID struct {
	ID uint `form:"id" binding:"required"`
}

// PromoComments represents the controller for a promo comment
type PromoComments struct {
	pcs models.PromoCommentService
}

// NewPromoComments is used to create a new promo comment controller
func NewPromoComments(pcs models.PromoCommentService) *PromoComments {
	return &PromoComments{
		pcs,
	}
}

// Create is used to proccess the promo comment form
// when a user submits the form. This is used to
// create a new comment in releation for a promo owned by a user
//
// METHOD:	POST
// ROUTE:	/promos/comments/new
//
// BODY:	PromoComment
func (pc *PromoComments) Create(c *gin.Context) {

	var form PromoCommentForm
	if err := c.Bind(&form); err != nil {
		response.RespondWithError(
			c,
			http.StatusUnprocessableEntity,
			"Unable to process form data due to invalid format",
		)
		return
	}

	// attempt to create and store comment in DB
	promoComment := models.PromoComment{
		UserID:  form.UserID,
		PromoID: form.PromoID,
		Body:    form.Body,
	}

	err := pc.pcs.Create(&promoComment)
	if err != nil {
		response.RespondWithError(
			c,
			http.StatusInternalServerError,
			err.Error())
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Comment successfully posted",
		"status":  http.StatusCreated,
	})
}
