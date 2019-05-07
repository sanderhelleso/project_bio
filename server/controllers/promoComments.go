package controllers

import (
	"net/http"

	"../lib/response"
	p "../lib/parser"
	"../models"
	"github.com/gin-gonic/gin"
)

// PromoCommentForm represents part of request body connected to a promo
// and endpoint /promos/comments/new
type PromoCommentForm struct {
	UserID       uint   `form:"userID" binding:"required"`
	PromoID      uint   `form:"promoID" binding:"required"`
	ResponseToID uint   `form:"responseToID"`
	Body         string `form:"body" binding:"required"`
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
		UserID:       form.UserID,
		PromoID:      form.PromoID,
		ResponseToID: form.ResponseToID,
		Body:         form.Body,
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

// ByPromoID is used to fetch comments releated to the passed
// in promoIDs promotion.
//
// METHOD: GET
// ROUTE: /comments/:id
//
func (pc *PromoComments) ByPromoID(c *gin.Context) {

	// fetch required params
	q := c.Request.URL.Query()

	id, err := p.StrToInt(c.Params.ByName("id")) // promo ID
	offset, oErr := p.StrToInt(q["offset"][0])  // offset start
	limit, lErr := p.StrToInt(q["limit"][0])   // limit after offset (eg : 97 + 3)

	if err != nil || oErr != nil || lErr != nil {
		response.RespondWithError(
			c,
			http.StatusInternalServerError,
			"Unable to load comments",
		)
		return
	}
	
	// attempt to load comments releated to recieved promo ID
	comments, err := pc.pcs.ByPromoID(id, offset, limit)
	if err != nil {
		response.RespondWithError(
			c,
			http.StatusInternalServerError,
			err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Comments successfully fetched",
		"status":  http.StatusOK,
		"payload": comments,
	})
}

// Count is used to fetch comments count releated to the passed
// in promoIDs promotion.
//
// METHOD: GET
// ROUTE: /comments/:id/count
//
func (pc *PromoComments) Count(c *gin.Context) {
	id, err := p.StrToInt(c.Params.ByName("id"))

	if err != nil {
		response.RespondWithError(
			c,
			http.StatusInternalServerError,
			"Unable to load comments count",
		)
		return
	}

	// attempt to loa comments count
	count, err := pc.pcs.Count(id)
	if err != nil {
		response.RespondWithError(
			c,
			http.StatusInternalServerError,
			err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Comments count successfully fetched",
		"status":  http.StatusOK,
		"payload": count,
	})		
} 
