package middelware

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"../response"
	"../jwt"
	"strings"
	"os"
	"fmt"
)

// RequireToken checks the incoming request header
// for a valid beared header token, then procceeds
// to validate the token and verifies that it matches
func RequireToken(c *gin.Context) {

	// get bearer token
	bearer := c.GetHeader("Authorization")
	if bearer == "" {
		response.RespondWithError(
			c,
			http.StatusForbidden,
			"Authentication token required")
		return
	}

	// get the token from the bearer header
	token := strings.Split(bearer, "Bearer ")[1]
	valid, id, verified := jwt.CompareJWT(token)
	fmt.Printf("\n\n valid: %v \n verified: %v \n\n", id, verified)

	if !valid {
		response.RespondWithError(
			c,
			http.StatusForbidden, 
			"Invalid authentication token")
		return
	}

	if !verified {
		response.RespondWithError(
			c, 
			http.StatusUnauthorized, 
			"Your account must be verified to perform this action")
		return
	}

	// update specifc request contex with id
	c.Set(os.Getenv("CTX_USER_KEY"), id)

	c.Next()
}  