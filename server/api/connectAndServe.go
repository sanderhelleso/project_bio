package api

import (
	cors "github.com/rs/cors/wrapper/gin"
	"github.com/gin-gonic/gin"
	"../controllers"
)

const maxMultiPartMem = 1 << 20 // 1mb

// ConnectAndServe connects all endpoint groupings 
// and serves the application on the port specified in.env 
func ConnectAndServe(
	usersC 		*controllers.Users, 
	followersC 	*controllers.Followers, 
	promosC 	*controllers.Promos,
	profilesC 	*controllers.Profiles,
) {

	// connect router and API v1
	router := gin.Default()
	router.Use(cors.Default())
	router.MaxMultipartMemory = maxMultiPartMem

	UsersRoutes(router, usersC)
	FollowersRoutes(router, followersC)
	PromosRoutes(router, promosC)
	ProfilesRoutes(router, profilesC)
	
	router.Run() // listen and serve on 0.0.0.0:5000
}