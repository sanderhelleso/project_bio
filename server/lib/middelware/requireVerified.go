package middelware

import (
	"net/http"

	"../../lib/parser"
	"../response"
	"github.com/gin-gonic/gin"
)

// RequireVerified verifies the users current verification status
func RequireVerified(c *gin.Context) {

	if !parser.GetVerifiedFromCTX(c) {
		response.RespondWithError(
			c,
			http.StatusUnauthorized,
			"Your account must be verified to perform this action")
		return
	}

	c.Next()
}
