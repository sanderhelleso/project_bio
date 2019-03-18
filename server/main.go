package main

import (
	"log"
	"./models"

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
	models.ConnectToDB()

	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run() // listen and serve on 0.0.0.0:5000
}
