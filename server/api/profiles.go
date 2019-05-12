package api

import (
	"../controllers"
	"../lib/middleware"
	"github.com/gin-gonic/gin"
)

// ProfilesRoutes controll the grouping of profiles releated aspects of the app
func ProfilesRoutes(router *gin.Engine, pc *controllers.Profiles) {
	v1 := router.Group("/api/v1/profiles")
	{
		v1.Use(middleware.RequireToken)
		v1.GET("/get", pc.ByUserID)
		v1.GET("/handle", pc.ByHandle)

		//v1.Use(middleware.RequireVerified)
		v1.POST("/new", pc.Create)
		v1.PUT("/avatar", pc.AvatarUpload)
		//v1.DELETE("/delete", pc.Delete)
	}
}
