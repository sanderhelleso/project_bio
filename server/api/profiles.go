package api

import (
	"github.com/gin-gonic/gin"
	"../controllers"
	"../lib/middelware"
)

// ProfilesRoutes controll the grouping of profiles releated aspects of the app
func ProfilesRoutes(router *gin.Engine, pc *controllers.Profiles) {
	v1 := router.Group("/api/v1/profiles")
	{
		v1.Use(middelware.RequireToken)
		v1.POST("/new", pc.Create)
		v1.PUT("/avatar", pc.AvatarUpload)		
		//v1.DELETE("/delete", pc.Delete)
	}
}