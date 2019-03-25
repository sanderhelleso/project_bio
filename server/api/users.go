package api

import (
	"../controllers"
	"../lib/middelware"
	"github.com/gin-gonic/gin"
)

// UsersRoutes controll the grouping of users releated aspects of the app
func UsersRoutes(router *gin.Engine, uc *controllers.Users) {
	v1 := router.Group("/api/v1/users")
	{
		v1.POST("/login", uc.Login)
		v1.POST("/verify", uc.CompleteVerification)
		v1.POST("/forgot", uc.InitiateReset)
		v1.POST("/reset", uc.CompleteReset)

		v1.Use(middelware.RequireToken)
		v1.DELETE("/delete", uc.Delete)
	}
}
