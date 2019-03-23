package main

import (
	"./models"
	"./controllers"
	"./api"
	"./lib"
	"os"
	"./email"

	"github.com/joho/godotenv"
)

func main() {

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

	services, err := models.NewServices()
	lib.Must(err)

	defer services.Close()
	//services.DestructiveReset()
	services.AutoMigrate()
	services.CreateReleations()

	usersC 		:= controllers.NewUsers(services.User, emailer)
	followersC 	:= controllers.NewFollowers(services.Follower)
	promosC	 	:= controllers.NewPromos(services.Promo)
	profilesC 	:= controllers.NewProfiles(services.Profile)

	api.ConnectAndServe(usersC, followersC, promosC, profilesC)
}
