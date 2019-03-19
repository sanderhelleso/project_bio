package api

import (
	"github.com/gin-gonic/gin"
	"../controllers"
)

// AuthRoutes controll the grouping of auth releated aspects of the app
func AuthRoutes(router *gin.Engine, uc *controllers.UserController) {
	v1 := router.Group("/api/v1/auth")
	{
		v1.POST("/signup", uc.Create)
		v1.POST("/login", uc.Login)
	}
}