package main

import (
	"os"

	"./api"
	"./controllers"
	"./email"
	"./lib"
	"./models"
	"./redis"
	"fmt"

	"github.com/joho/godotenv"
)

func main() {

	// load envs
	err := godotenv.Load()
	lib.Must(err)

	// mail client setup
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

	// connect controllers
	usersC := controllers.NewUsers(services.User, emailer)
	followersC := controllers.NewFollowers(services.Follower)
	promosC := controllers.NewPromos(services.Promo, services.PromoProduct, services.Profile)
	promoProductsC := controllers.NewPromoProducts(services.PromoProduct, services.Image)
	profilesC := controllers.NewProfiles(services.Profile, services.Image)

	// defer close connections
	defer services.Close()
	defer conn.Close()

	err = redis.Set(conn, "test", 1337)
	val, err := redis.Get(conn, "test", "int")
	fmt.Println(val)

	// connect and serve app
	api.ConnectAndServe(usersC, followersC, promosC, promoProductsC, profilesC)
}
