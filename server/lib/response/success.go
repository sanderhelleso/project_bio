package response

import (
	"github.com/gin-gonic/gin"
)

// RespondWithSuccess responds with an success to a http request with provided data
func RespondWithSuccess(c *gin.Context, code int, message interface{}) {
	c.JSON(code, gin.H {
		"message": 	message,
		"status": 	code,
	})
}

// RespondWithSuccessAndSlice responds with an success to a http request with provided data
// argument 't' represents any type and the response payload will be the slice of the types data
func RespondWithSuccessAndSlice(c *gin.Context, code int, message interface{}, t interface{}) {
	c.JSON(code, gin.H {
		"message": 	message,
		"status": 	code,
		"payload": t,
	})
}