
package models

import (
	"github.com/jinzhu/gorm"
	"../lib"
	"os"
)

// NewServices create a connection to all services of the application
func NewServices() (*Services, error) {
	db, err := gorm.Open(os.Getenv("DB_TYPE"), lib.ConnectionInfo())
	if err != nil {
		return nil, err
	}

	db.LogMode(true)
	return &Services{
		User:    NewUserService(db),
		db:      db,
	}, nil
}

// Services connects all of the application services
type Services struct {
	User    UserService
	db      *gorm.DB
}

// Close closes the  database connection
func (s *Services) Close() error {
	return s.db.Close()
}

// DestructiveReset drops all tables and rebuilds it
func (s *Services) DestructiveReset() error {
	err := s.db.DropTableIfExists(&User{}).Error
	if err != nil {
		return err
	}

	return s.AutoMigrate()
}

// AutoMigrate will attempt to automatically migrate all tables
func (s *Services) AutoMigrate() error {
	err := s.db.AutoMigrate(&User{}).Error
	return err
}