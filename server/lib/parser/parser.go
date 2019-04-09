package parser

import (
	"fmt"
	"math"
	"net/http"
	"net/url"
	"os"
	"reflect"
	"strconv"
	"strings"
	"bytes"
	"encoding/binary"

	"github.com/gin-gonic/gin"
)

// MakeIntBytes takes in an integer 'n' and converts
// the integer to its corresponding total byte value
func MakeIntBytes(n int) []byte {
	buffer := new(bytes.Buffer)
	_ = binary.Write(buffer, binary.LittleEndian, n)
	
	return buffer.Bytes()
}

// ParseUserID parses the given string representation of a user id
// and validates conversion, will return uint value of given string.
//
// If unable to parse, send back http status that form data is invalid
func ParseUserID(value string) (uint, error) {
	n, err := strconv.Atoi(value)
	if err != nil {
		return 0, err
	}

	return uint(n), err
}

// RoundFloat64 takes in any float64 value and rounds it to two decimals
func RoundFloat64(value float64) float64 {
	return math.Round(value*100) / 100
}

// GetDomainNameFromURL gets the domain name from passed in URL
// Url must be valid in order for func to provide correct result
func GetDomainNameFromURL(u *url.URL) string {
	parts := strings.Split(u.Hostname(), ".")
	domain := parts[len(parts)-2] + "." + parts[len(parts)-1]
	return domain
}

// GetIDFromCTX fetches the userID from current context
func GetIDFromCTX(c *gin.Context) uint {
	val := c.MustGet(os.Getenv("CTX_USER_KEY"))
	id, err := ParseUserID(fmt.Sprint(val))
	if err != nil {

		// this is a VERY rare error, should add some logs here...
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
			"code":    http.StatusForbidden,
			"message": "Unable to identify user",
		})
	}

	return id
}

// GetVerifiedFromCTX fetches the users verification status from current context
func GetVerifiedFromCTX(c *gin.Context) bool {
	val := c.MustGet("verified")
	verified, err := strconv.ParseBool(fmt.Sprint(val))
	if err != nil {

		// this is a VERY rare error, should add some logs here...
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
			"code":    http.StatusForbidden,
			"message": "Unable to identify verification status",
		})
	}

	return verified
}

// MakeSlice creates a slice from interface
func MakeSlice(arg interface{}) (out []interface{}, ok bool) {
	slice, success := takeArg(arg, reflect.Slice)
	if !success {
		ok = false
		return
	}

	c := slice.Len()
	out = make([]interface{}, c)
	for i := 0; i < c; i++ {
		out[i] = slice.Index(i).Interface()
	}

	return out, true
}

// GetSliceLenFromType gets the length of a slice from a type
func GetSliceLenFromType(arg interface{}) int {
	slice, success := takeArg(arg, reflect.Slice)
	if !success {
		return 0
	}

	return slice.Len()
}

// takeArg is a helper function for MakeSlice that validates the args passed in
func takeArg(arg interface{}, kind reflect.Kind) (val reflect.Value, ok bool) {
	val = reflect.ValueOf(arg)
	if val.Kind() == kind {
		ok = true
	}

	return
}