package api

import (
	"github.com/gin-gonic/gin"
	"../controllers"
	"../lib/middleware"
)

// FollowersRoutes controll the grouping of auth releated aspects of the app
func FollowersRoutes(router *gin.Engine, fc *controllers.Followers) {
	v1 := router.Group("/api/v1/followers")
	{
		v1.Use(middleware.RequireToken)
		v1.POST("/new", fc.Create)
		v1.POST("/releationship", fc.ByReleationship)
		v1.GET("/:userID/is", fc.ByUserID)
		v1.GET("/:userID/have", fc.ByUserFollowingID)
		v1.POST("/delete", fc.Delete)		
	}
}