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

	us := models.ConnectToUserServiceDB()   // user service & db
	uc := controllers.NewUserController(us) // user controller
	api.ConnectAndServe(uc)					// connect api & serve
}
