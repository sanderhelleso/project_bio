package main

import (
	"./models"
	"./controllers"
	"./api"
	"./lib"

	"github.com/joho/godotenv"
)

func main() {

	// ! REMEMBER TO ADD TO .gitigore IF EVER GOING PUBLIC REPO !
	err := godotenv.Load()
	lib.Must(err)

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
