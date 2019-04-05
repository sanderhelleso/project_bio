package api

import (
	"github.com/gin-gonic/gin"
	"../controllers"
	"../lib/middelware"
)

// PromosRoutes controll the grouping of promo releated aspects of the app
func PromosRoutes(router *gin.Engine, pc *controllers.Promos) {
	v1 := router.Group("/api/v1/promos")
	{
		v1.Use(middelware.RequireToken)
		v1.POST("/new", pc.Create)
		v1.POST("/update", pc.Update)
		v1.DELETE("/delete", pc.Delete)
		v1.GET("/:id", pc.ByID)
	}
}