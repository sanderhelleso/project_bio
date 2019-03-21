
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
		User:     NewUserService(db),
		Profile:  NewProfileService(db),	
		Follower: NewFollowerService(db),
		Promo:	  NewPromoService(db),
		db:       db,
	}, nil
}

// Services connects all of the application services
type Services struct {
	User     UserService
	Profile  ProfileService
	Follower FollowerService
	Promo	 PromoService
	db       *gorm.DB
}

// CreateReleations create the table releationships
// betweetn the tables in the applications database
func (s *Services) CreateReleations() {
	s.db.Model(&s.User).Related(&s.Follower)
	s.db.Model(&s.User).Related(&s.Profile)
}

// Close closes the  database connection
func (s *Services) Close() error {
	return s.db.Close()
}

// DestructiveReset drops all tables and rebuilds it
func (s *Services) DestructiveReset() error {
	err := s.db.DropTableIfExists(&User{}, &Follower{}, &Promo{}, &Profile{}).Error
	if err != nil {
		return err
	}

	return s.AutoMigrate()
}

// AutoMigrate will attempt to automatically migrate all tables
func (s *Services) AutoMigrate() error {
	err := s.db.AutoMigrate(&User{}, &Follower{}, &Promo{}, &Profile{}).Error
	return err
}