package api

import (
	"github.com/gin-gonic/gin"
	"../controllers"
	"../lib/middelware"
)

// PromoProductsRoutes controll the grouping of promo products releated aspects of the app
func PromoProductsRoutes(router *gin.Engine, ppc *controllers.PromoProducts) {
	v1 := router.Group("/api/v1/promos/products")
	{
		v1.Use(middelware.RequireToken)
		//v1.POST("/update", ppc.Update)
		//v1.DELETE("/delete", ppc.Delete)
		v1.PUT("/image", ppc.ImageUpload)
	}
}