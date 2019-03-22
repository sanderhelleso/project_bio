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

	// ! REMEMBER TO ADD TO .gitigore IF EVER GOING PUBLIC REPO !
	err := godotenv.Load()
	lib.Must(err)

	emailer := email.NewClient(
	email.WithSender(
		os.Getenv("MAIL_DEFAULT_NAME"),
		os.Getenv("MAILGUN_EMAIL")),
	email.WithMailgun(
		os.Getenv("MAIL_DOMAIN"), 
		os.Getenv("MAILGUN_API_KEY"),
		os.Getenv("MAILGUN_PUB_KEY")))

	_ = emailer

	services, err := models.NewServices()
	lib.Must(err)

	defer services.Close()
	//services.DestructiveReset()
	services.AutoMigrate()
	services.CreateReleations()

	usersC 		:= controllers.NewUsers(services.User)
	followersC 	:= controllers.NewFollowers(services.Follower)
	promosC	 	:= controllers.NewPromos(services.Promo)
	profilesC 	:= controllers.NewProfiles(services.Profile)

	api.ConnectAndServe(usersC, followersC, promosC, profilesC)
}
