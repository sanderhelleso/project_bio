package api

import (
	"github.com/gin-gonic/gin"
	"../controllers"
	"../lib/middleware"
)

// FavoriteRoutes controll the grouping of user - promo favorite releated aspects of the app
func FavoriteRoutes(router *gin.Engine, fc *controllers.Favorites) {
	v1 := router.Group("/api/v1/favorites")
	{
		v1.Use(middleware.RequireToken)
		v1.POST("/new", fc.Create)
		v1.POST("/check", fc.Check)	
		v1.POST("/delete", fc.Delete)	
	}
}