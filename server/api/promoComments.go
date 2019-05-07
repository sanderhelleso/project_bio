package api

import (
	"../controllers"
	"../lib/middelware"
	"github.com/gin-gonic/gin"
)

// PromoCommentsRoutes controll the grouping of promo comments
// releated aspects of the application
func PromoCommentsRoutes(router *gin.Engine, pcc *controllers.PromoComments) {
	v1 := router.Group("/api/v1/comments")

	v1.Use(middelware.RequireToken)
	v1.POST("/new", pcc.Create)
	v1.GET("/:id", pcc.ByPromoID)
	v1.GET("/:id/count", pcc.Count)
}
