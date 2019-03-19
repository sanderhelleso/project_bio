package api

import (
	"github.com/gin-gonic/gin"
	"../controllers"
)

// ConnectAndServe connects all endpoint groupings 
// and serves the application on the port specified in.env 
func ConnectAndServe(uc *controllers.UserController) {

	// connect router and API v1
	router := gin.Default()
	AuthRoutes(router, uc)
	router.Run() // listen and serve on 0.0.0.0:5000
}