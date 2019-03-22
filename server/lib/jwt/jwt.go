package jwt

import (
	"github.com/dgrijalva/jwt-go"
	"fmt"
	"os"
	"errors"
	"strconv"
	"../../models"
)

var sign = []byte(os.Getenv("JWT_SECRET_KEY"))

// GenerateJWT generates a new JWT token for use in API endpoint validation
func GenerateJWT(user *models.User) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["userID"] = fmt.Sprint(user.ID)
	claims["verified"] = user.Verified

	tokenString, err := token.SignedString(sign)

	if err != nil {
		fmt.Printf("Something went wrong: %s", err.Error())
		return "", nil
	}

	return tokenString, nil
}

// CompareJWT compares a passed in header token and validates 
func CompareJWT(headerToken string) (bool, uint, bool)  {
	token, err := jwt.Parse(headerToken, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("Unexpected signing method")
		}

		return sign, nil
	})

	// handle invalid signing methods
	if err != nil {
		return false, 0, false
	}

	id, verified := formatClaims(token.Claims.(jwt.MapClaims))
	return token.Valid, id, verified
}

func formatClaims(claims jwt.MapClaims) (uint, bool) {

	// retrieve & format claims
	id, _ 	 := strconv.Atoi(claims["userID"].(string))
	verified := claims["verified"].(bool)

	// return values retrieved from claims
	return uint(id), verified
}