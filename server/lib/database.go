package lib

import (
	"os"
	"fmt"
)

// ConnectionInfo returns the given connection info for the
// database configured with the data lsiten in the .env file
func ConnectionInfo() string {
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
	os.Getenv("DB_HOST"), os.Getenv("DB_PORT"), os.Getenv("DB_USER"), os.Getenv("DB_PASS"), os.Getenv("DB_NAME"))
	return psqlInfo
}