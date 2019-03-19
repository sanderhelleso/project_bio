package main

import (
	"fmt"
	"../lib/jwt"
)

func main() {
	tokenString, err := jwt.GenerateJWT(1)
	if err != nil {
		panic(err)
	}

	fmt.Println(tokenString)
}