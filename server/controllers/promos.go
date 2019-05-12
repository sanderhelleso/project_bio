package controllers

import (
	"fmt"
	"net/http"
	"time"

	"../lib/parser"
	"../lib/response"
	"../models"
	"github.com/gin-gonic/gin"
)

// PromoForm represents the request body to the endpoint /promos.
// PromoForms structure is used for create
type PromoForm struct {
	Title       string `form:"title" binding:"required"`
	Description string `form:"description" binding:"required"`
	Category    string `form:"category" binding:"required"`
	Code        string `form:"code" binding:"required"`
	Discount    uint   `form:"discount" binding:"required"`
	Expires     int64  `form:"expires" binding:"required"`

	Products []*PromoProductForm `form:"products" binding:"required"`
}

// UpdatePromoForm represents the request body to the endpoint /promos/update.
// UpdatePromoForms structure is used for update
type UpdatePromoForm struct {
	ID          uint      `form:"id" binding:"required"`
	Title       string    `form:"title" binding:"required"`
	Description string    `form:"description" binding:"required"`
	Category    string    `form:"category" binding:"required"`
	Code        string    `form:"code"`
	Discount    uint      `form:"discount"`
	Expires     time.Time `form:"expiresAt"`
}

// PromoFormWithID represents the request body to the endpoints
// /promos/delete and /promos/image
type PromoFormWithID struct {
	ID uint `form:"id" binding:"required"`
}

// Promos represents the controller for a promoer releationship in the app
type Promos struct {
	ps    models.PromoService
	pps   models.PromoProductService
	profs models.ProfileService
}

// NewPromos is used to create a new promoer controller
func NewPromos(
	ps models.PromoService,
	pps models.PromoProductService,
	profs models.ProfileService) *Promos {

	//ps.Seed()

	return &Promos{
		ps,
		pps,
		profs,
	}
}

// Create is used to process the promo form
// when a user submits the form. This is used to
// create a new promo owned by a user
//
// METHOD: 	POST
// ROUTE:	/promos/new
//
// BODY:	PromoForm
func (p *Promos) Create(c *gin.Context) {

	var form PromoForm
	if err := c.Bind(&form); err != nil {
		response.RespondWithError(
			c,
			http.StatusUnprocessableEntity,
			"Unable to process form data due to invalid format",
		)
		return
	}

	// attempt to create and store promo in DB
	promo := models.Promo{
		UserID:      parser.GetIDFromCTX(c),
		Title:       form.Title,
		Description: form.Description,
		Category:    form.Category,
		Code:        form.Code,
		Discount:    form.Discount,
		ExpiresAt:   parser.TsToTime(form.Expires),
	}

	// create promo
	promoID, err := p.ps.Create(&promo)
	if err != nil {
		response.RespondWithError(
			c,
			http.StatusInternalServerError,
			err.Error())
		return
	}

	// create products connected to created promo
	promoProductIDs := make([]uint, 0)
	for _, product := range form.Products {

		promoProduct := models.PromoProduct{
			PromoID:  promoID,
			Name:     product.Name,
			Brand:    product.Brand,
			Link:     product.Link,
			Price:    product.Price,
			Currency: product.Currency,
		}

		if err := p.pps.Create(&promoProduct); err != nil {
			response.RespondWithError(
				c,
				http.StatusInternalServerError,
				err.Error())
			return
		}

		promoProductIDs = append(promoProductIDs, promoProduct.ID)
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Promo successfully created",
		"status":  http.StatusCreated,
		"payload": gin.H{
			"promoProductIDs": promoProductIDs,
			"promoID":         promoID,
		},
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
	promo := models.Promo{
		Title:       form.Title,
		Description: form.Description,
		Code:        form.Code,
		Discount:    form.Discount,
		ExpiresAt:   form.Expires,
	}

	if err := p.ps.Update(&promo); err != nil {
		response.RespondWithError(
			c,
			http.StatusInternalServerError,
			"Something went wrong when attempting to update promo. Please try again")
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Promo successfully updated",
		"status":  http.StatusOK,
		"payload": promo,
	})
}

// Delete is used to delete a promo identified
// by the passed in promo id
//
// METHOD: 	DELETE
// ROUTE:	/promos/delete
//
// BODY:	PromoID
func (p *Promos) Delete(c *gin.Context) {

	var form PromoFormWithID
	if c.Bind(&form) != nil {
		response.RespondWithError(
			c,
			http.StatusUnprocessableEntity,
			"Unable to process form data due to invalid format")
		return
	}

	err := p.ps.Delete(form.ID)
	if err != nil {
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

// ByID is used to find a promotion
// by the passed in handle and promo ID
//
// METHOD: 	GET
// ROUTE:	/promos/:handle/:id
//
// PARAMS: handle, id
func (p *Promos) ByID(c *gin.Context) {

	// attempt to find the user by the provided handle
	handle := c.Params.ByName("handle")
	profile, err := p.profs.ByHandle(handle)

	if err != nil {
		response.RespondWithError(
			c,
			http.StatusNotFound,
			fmt.Sprintf("Could not find any profiles with the handle: %s", handle))
		return
	}

	// find the promo by the given id
	id, _ := parser.StrToInt(c.Params.ByName("id"))
	promo, err := p.ps.ByID(id)

	if err != nil || promo.UserID != profile.UserID {
		response.RespondWithError(
			c,
			http.StatusNotFound,
			fmt.Sprintf("%s does not have any promotions with the ID: %d", handle, id))
		return
	}

	// find the promos products by the promos id
	products, err := p.pps.ByPromoID(promo.ID)
	if err != nil {
		response.RespondWithError(
			c,
			http.StatusNotFound,
			fmt.Sprintf("Unable to get the promotions products at this time. Please try again."))
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Promo successfully fetched",
		"status":  http.StatusOK,
		"payload": gin.H{
			"promo":    promo,
			"products": products,
			"profile":  profile,
		},
	})
}

// FindRecomendations attempts to find matching and accurate
// promotion recomendation based on the users previously
// watched history of promotions
//
// METHOD: 	POST
// ROUTE:	/promos/recomendations
func (p *Promos) FindRecomendations(c *gin.Context) {

	var t []*UpdatePromoForm

	if c.Bind(&t) != nil {
		response.RespondWithError(
			c,
			http.StatusUnprocessableEntity,
			"Unable to process form data due to invalid format")
		return
	}

	history := make([]*models.PromoFromHist, len(t))
	for i, promo := range t {
		history[i] = &models.PromoFromHist{
			ID:       promo.ID,
			Title:    promo.Title,
			Category: promo.Category,
		}
	}

	// get recomendations based on users history
	recomendations, err := p.ps.FindRecomendations(history)
	if err != nil {
		response.RespondWithError(
			c,
			http.StatusOK,
			"Unable to find any recomendations based on the provided history.")
		return
	}

	// find the promos products preview by the promos id
	for _, rec := range recomendations {
		if previews, err := p.pps.PreviewByPromoID(rec.ID); err == nil {
			rec.Previews = previews
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Recomendations successfully fetched",
		"status":  http.StatusOK,
		"payload":  recomendations,
	})
}
