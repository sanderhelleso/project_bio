package parser

import (
    "strconv"
    "os"
    "github.com/gin-gonic/gin"
    "errors"
    "reflect"
    "fmt"
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

// GetIDFromCTX fetches the userID from current context
// If unable to parse, return 0 and error message
func GetIDFromCTX(c *gin.Context) (uint, error) {
    id, found := c.Get(os.Getenv("CTX_USER_KEY"))
	if !found { 
        return 0, errors.New("Unable to identify user")
    }

	return ParseUserID(fmt.Sprint(id))
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

// takeArg is a helper function for MakeSlice that validates the args
func takeArg(arg interface{}, kind reflect.Kind) (val reflect.Value, ok bool) {
    val = reflect.ValueOf(arg)
    if val.Kind() == kind {
        ok = true
	}
	
    return
}