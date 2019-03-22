package api

import (
	"github.com/gin-gonic/gin"
	"../controllers"
	"../lib/middelware"
)

// UsersRoutes controll the grouping of users releated aspects of the app
func UsersRoutes(router *gin.Engine, uc *controllers.Users) {
	v1 := router.Group("/api/v1/users")
	{
		v1.POST("/signup", uc.Create)
		v1.POST("/login", uc.Login)
		v1.POST("/verify", uc.CompleteVerification)
		v1.POST("/forgot", uc.IntitiateReset)
		v1.POST("/reset", uc.CompleteReset)
		
		v1.Use(middelware.RequireToken)
		v1.DELETE("/delete", uc.Delete)
	}
}