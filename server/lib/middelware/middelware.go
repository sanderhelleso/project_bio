package middelware

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"../response"
	"strings"
)

// RequireToken checks the incoming request header
// for a valid beared header token, then procceeds
// to validate the token and verifies that it matches
func RequireToken(c *gin.Context) {

	// get bearer token
	bearer := c.GetHeader("Authorization")
	if bearer == "" {
		response.RespondWithError(c, http.StatusForbidden, "Authentication token required")
		return
	}

	token := strings.Split(bearer, "Bearer ")[1]
	response.RespondWithError(c, http.StatusForbidden, token)
	return

	c.Next()
}  