package api

import (
	"../controllers"
	"../sockets"
	"github.com/gin-gonic/gin"
	"github.com/gomodule/redigo/redis"
	"../lib/middleware"
)

const maxMultiPartMem = 1 << 20 // 1mb

// ConnectAndServe connects all endpoint groupings
// and serves the application on the port specified in.env
func ConnectAndServe(
	usersC *controllers.Users,
	followersC *controllers.Followers,
	promosC *controllers.Promos,
	promoProductsC *controllers.PromoProducts,
	promoCommentsC *controllers.PromoComments,
	profilesC *controllers.Profiles,
	favoritesC *controllers.Favorites,
	conn *redis.Conn,
) {

	// connect router and API v1
	router := gin.Default()
	router.Use(middleware.Cors())
	router.MaxMultipartMemory = maxMultiPartMem

	// routes
	UsersRoutes(router, usersC)
	FollowersRoutes(router, followersC)
	PromosRoutes(router, promosC)
	PromoProductsRoutes(router, promoProductsC)
	PromoCommentsRoutes(router, promoCommentsC)
	FavoriteRoutes(router, favoritesC)
	ProfilesRoutes(router, profilesC)

	// connect sockets
	sockets.ConnectUpgraders(router, conn)

	// connect fileserver
	FileServer(router)

	router.Run() // listen and serve on 0.0.0.0:5000
}
