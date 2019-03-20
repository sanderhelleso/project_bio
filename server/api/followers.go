package api

import (
	"github.com/gin-gonic/gin"
	"../controllers"
	"../lib/middelware"
)

// FollowerRoutes controll the grouping of auth releated aspects of the app
func FollowerRoutes(router *gin.Engine, fc *controllers.Followers) {
	v1 := router.Group("/api/v1/followers")
	{
		v1.Use(middelware.RequireToken)
		v1.POST("/new", fc.Create)
		v1.GET("/:userID/all", fc.ByUserID)
		v1.DELETE("/delete", fc.Delete)		
	}
}