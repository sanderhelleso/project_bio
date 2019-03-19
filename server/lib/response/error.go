package response

import (
	"github.com/gin-gonic/gin"
)

// RespondWithError responds with an error to a http request with provided data
func RespondWithError(c *gin.Context, code int, message interface{}) {
	c.AbortWithStatusJSON(code, gin.H {
		"error": 	message,
		"status": 	code,
	})
}