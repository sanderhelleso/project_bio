package api

import (
	"github.com/gin-gonic/gin"
)

// FileServer servers files from the application
func FileServer(router *gin.Engine) {
	router.Static("/images", "./images")
}