package jwt

import (
	"github.com/dgrijalva/jwt-go"
	"fmt"
	"time"
	"os"
	"errors"
)

var sign = []byte(os.Getenv("JWT_SECRET_KEY"))

// GenerateJWT generates a new JWT token for use in API endpoint validation
func GenerateJWT(uid uint) (string, error) {

	// create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims {
		Subject: string(uid),
		ExpiresAt: time.Now().Add(time.Minute * 30).Unix(),
	})

	tokenString, err := token.SignedString(sign)

	if err != nil {
		fmt.Printf("Something went wrong: %s", err.Error())
		return "", nil
	}

	return tokenString, nil
}

// CompareJWT compares a passed in header token and validates 
func CompareJWT(headerToken string) bool  {
	token, err := jwt.Parse(headerToken, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("Unexpected signing method")
		}

		return sign, nil
	})

	// handle invalid signing methods
	if err != nil {
		return false
	}

	return token.Valid
}