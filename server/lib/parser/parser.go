package parser

import (
    "strconv"
    "os"
    "github.com/gin-gonic/gin"
    "net/http"
    "reflect"
    "fmt"
    "math"
)

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
    return math.Round(value * 100) / 100
}

// GetIDFromCTX fetches the userID from current context
func GetIDFromCTX(c *gin.Context) uint {
    val := c.MustGet(os.Getenv("CTX_USER_KEY"))
    id, err := ParseUserID(fmt.Sprint(val))
    if err != nil {

        // this is a VERY rare error, should add some logs here...
        c.AbortWithStatusJSON(http.StatusForbidden, gin.H {
            "code": http.StatusForbidden,
            "message": "Unable to identify user",
        })
    }

	return id
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