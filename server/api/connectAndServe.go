package api

import (
	"../controllers"
	"github.com/gin-gonic/gin"
)

const maxMultiPartMem = 1 << 20 // 1mb

// ConnectAndServe connects all endpoint groupings
// and serves the application on the port specified in.env
func ConnectAndServe(
	usersC *controllers.Users,
	followersC *controllers.Followers,
	promosC *controllers.Promos,
	profilesC *controllers.Profiles,
) {

	// connect router and API v1
	router := gin.Default()
	router.Use(corsMiddleware())

	router.MaxMultipartMemory = maxMultiPartMem

	UsersRoutes(router, usersC)
	FollowersRoutes(router, followersC)
	PromosRoutes(router, promosC)
	ProfilesRoutes(router, profilesC)

	router.Run() // listen and serve on 0.0.0.0:5000
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Max-Age", "86400")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Length")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
		} else {
			c.Next()
		}
	}
}
