package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"../lib/response"
	"strconv"
)

// ParseUserID parses the given string representation of a user id
// and validates conversion, will return uint value of given string.
//
// If unable to parse, send back http status that form data is invalid
func ParseUserID(value string, c *gin.Context) (uint, error) {
	n, err := strconv.Atoi(value)
	if err != nil {
		response.RespondWithError(
			c, 
			http.StatusUnprocessableEntity, 
			"Unable to process form data due to invalid format")
			return 0, err
	}

	return uint(n), err
}