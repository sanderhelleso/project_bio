package jwt

import (
	"github.com/dgrijalva/jwt-go"
	"fmt"
	"os"
	"errors"
	"strconv"
)

var sign 	= []byte(os.Getenv("JWT_SECRET_KEY"))

// GenerateJWT generates a new JWT token for use in API endpoint validation
func GenerateJWT(id uint) (string, error) {

	// create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims {
		Subject: fmt.Sprint(id),
		ExpiresAt: 0, 
	})

	tokenString, err := token.SignedString(sign)

	if err != nil {
		fmt.Printf("Something went wrong: %s", err.Error())
		return "", nil
	}

	return tokenString, nil
}

// CompareJWT compares a passed in header token and validates 
func CompareJWT(headerToken string) (bool, uint)  {
	token, err := jwt.Parse(headerToken, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("Unexpected signing method")
		}

		return sign, nil
	})

	// handle invalid signing methods
	if err != nil {
		return false, 0
	}

	// retrieve claims and parse subject id
	claims := token.Claims.(jwt.MapClaims)
	id, _ := strconv.Atoi(claims["sub"].(string))

	return token.Valid, uint(id)
}