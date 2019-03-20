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
	services.DestructiveReset()
	services.AutoMigrate()
	services.CreateReleations()

	uc := controllers.NewUsers(services.User)
	fc := controllers.NewFollowers(services.Follower)
	api.ConnectAndServe(uc, fc)
}
