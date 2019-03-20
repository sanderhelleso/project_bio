package api

import (
	"github.com/gin-gonic/gin"
	"../controllers"
	"../lib/middelware"
)

// FollowRoutes controll the grouping of auth releated aspects of the app
func FollowRoutes(router *gin.Engine, fc *controllers.Followers) {
	v1 := router.Group("/api/v1/follow")
	{
		v1.Use(middelware.RequireToken)
		v1.POST("/new", fc.Create)
		v1.DELETE("/unfollow", fc.Delete)		
	}
}