package api

import (
	"net/http"

	"../controllers"
	"../lib/middelware"
	"github.com/gin-gonic/gin"
)

// ProfilesRoutes controll the grouping of profiles releated aspects of the app
func ProfilesRoutes(router *gin.Engine, pc *controllers.Profiles) {
	v1 := router.Group("/api/v1/profiles")
	{
		v1.Use(middelware.RequireToken)
		v1.GET("/get", pc.ByUserID, preflight)

		v1.Use(middelware.RequireVerified)
		v1.POST("/new", pc.Create)
		v1.PUT("/avatar", pc.AvatarUpload)
		//v1.DELETE("/delete", pc.Delete)
	}
}

func preflight(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers")
	c.JSON(http.StatusOK, struct{}{})
}
