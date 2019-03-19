package rand

import (
	"crypto/rand"
	"encoding/base64"
	"os"
	"strconv"
)

// Bytes will generate n random bytes, or will return an error if there was one
// This uses the crypto/rand package so it is safe to use with things like remember tokens
func Bytes (n int) ([]byte, error) {
	b := make([]byte, n)
	_, err := rand.Read(b)
	if err != nil { 
		return nil, err 
	
	}

	return b, nil
}

// String will generate a byte slice of nBytes and then
// return a string of the base64 URL encoded version of the byte slice
func String(nBytes int) (string, error) {
	b, err := Bytes(nBytes)
	if err != nil {
		return "", err
	}

	return base64.URLEncoding.EncodeToString(b), nil
}

// RememberToken helper function designed to generate
// remember tokens of a predetermined byte size
func RememberToken() (string, error) {
	b, _ := strconv.Atoi(os.Getenv("REMBR_TOK_BYTES"))
	return String(b)
}