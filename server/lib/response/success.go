package response

import (
	"github.com/gin-gonic/gin"
)

// RespondWithSuccess responds with an success to a http request with provided data
func RespondWithSuccess(c *gin.Context, code int, message interface{}, payload ...interface{}) {
	c.JSON(code, gin.H {
		"message": 	message,
		"status": 	code,
		"payload":  payload,
	})
}