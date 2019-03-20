package api

import (
	"github.com/gin-gonic/gin"
	"../controllers"
)

// ConnectAndServe connects all endpoint groupings 
// and serves the application on the port specified in.env 
func ConnectAndServe(uc *controllers.Users, fc *controllers.Followers, pc *controllers.Promos) {

	// connect router and API v1
	router := gin.Default()

	UsersRoutes(router, uc)
	FollowersRoutes(router, fc)
	PromosRoutes(router, pc)
	
	router.Run() // listen and serve on 0.0.0.0:5000
}