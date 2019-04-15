package api

import (
	"../controllers"
	"../lib/middelware"
	"github.com/gin-gonic/gin"
)

// PromoCommentsRoutes controll the grouping of promo comments
// releated aspects of the application
func PromoCommentsRoutes(router *gin.Engine, pcc *controllers.PromoComments) {
	v1 := router.Group("/api/v1/promos/comments")

	v1.Use(middelware.RequireToken)
	v1.POST("/new", pcc.Create)
}
