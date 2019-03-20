package api

import (
	"github.com/gin-gonic/gin"
	"../controllers"
	"../lib/middelware"
)

// PromoRoutes controll the grouping of promo releated aspects of the app
func PromosRoutes(router *gin.Engine, pc *controllers.Promos) {
	v1 := router.Group("/api/v1/promos")
	{
		v1.Use(middelware.RequireToken)
		v1.POST("/new", pc.Create)
	}
}