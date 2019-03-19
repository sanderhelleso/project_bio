package main

import (
	"log"
	"./models"
	"./controllers"
	"./lib/middelware"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	// ! REMEMBER TO ADD TO .gitigore IF EVER GOING PUBLIC REPO !
	// load .env variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// connecto to database
	uS := models.ConnectToUserServiceDB()

	// create user controller
	uC := controllers.NewUserController(uS)

	// connect router and API v1
	router := gin.Default()
	v1 := router.Group("/api/v1")
	v1.Use(middelware.RequireToken)
	{
		v1.POST("/signup", uC.Create)
		v1.POST("/login", uC.Login)
	}
	router.Run() // listen and serve on 0.0.0.0:5000
}
