package jwt

import (
	"github.com/dgrijalva/jwt-go"
	"fmt"
	"time"
	"os"
)

// GenerateJWT generates a new JWT token for use in
// API endpoint validation. Must be valid to procceed
func GenerateJWT(uid int) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims {
		Subject: string(uid),
		ExpiresAt: time.Now().Add(time.Minute * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET_KEY")))

	if err != nil {
		fmt.Printf("Something went wrong: %s", err.Error())
		return "", nil
	}

	return tokenString, nil
}