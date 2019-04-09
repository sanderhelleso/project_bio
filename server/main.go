package main

import (
	"os"

	"./api"
	"./controllers"
	"./email"
	"./lib"
	"./models"
	"./redis"

	"github.com/joho/godotenv"
)

func main() {

	// load envs
	err := godotenv.Load()
	lib.Must(err)

	// setup mail client 
	emailer := email.NewClient(
		email.WithSender(
			os.Getenv("MAIL_DEFAULT_NAME"),
			os.Getenv("MAIL_DEFAULT_EMAIL"),
		),
		email.WithMailgun(
			os.Getenv("MAILGUN_DOMAIN"),
			os.Getenv("MAILGUN_API_KEY"),
			os.Getenv("MAILGUN_PUB_KEY"),
		),
	)

	// setup services
	services, err := models.NewServices()
	lib.Must(err)

	//services.DestructiveReset()
	services.AutoMigrate()
	services.CreateReleations()

	// setup redis
	pool := redis.NewPool()
	conn := pool.Get()
	lib.Must(redis.Ping(conn))

	// setup controllers
	usersC := controllers.NewUsers(services.User, emailer)
	followersC := controllers.NewFollowers(services.Follower)
	promosC := controllers.NewPromos(services.Promo, services.PromoProduct, services.Profile)
	promoProductsC := controllers.NewPromoProducts(services.PromoProduct, services.Image)
	profilesC := controllers.NewProfiles(services.Profile, services.Image)

	// defer close connections
	defer services.Close()
	defer conn.Close()

	// connect and serve app
	api.ConnectAndServe(usersC, followersC, promosC, promoProductsC, profilesC, &conn)
}
