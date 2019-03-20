package api

import (
	"github.com/gin-gonic/gin"
	"../controllers"
	"../lib/middelware"
)

// AuthRoutes controll the grouping of auth releated aspects of the app
func AuthRoutes(router *gin.Engine, uc *controllers.Users) {
	v1 := router.Group("/api/v1/auth")
	{
		v1.POST("/signup", uc.Create)
		v1.POST("/login", uc.Login)
		
		v1.Use(middelware.RequireToken)
		v1.DELETE("/delete", uc.Delete)
	}
}