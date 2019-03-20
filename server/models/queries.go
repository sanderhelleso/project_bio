package models

import (
	"github.com/jinzhu/gorm"
)

// first will query using the provided gorm.DB and it
// will get the first item returned and place it into
// dst. If nothing is found in the query, it will
// return ErrNotFound
func first(db *gorm.DB, dst interface{}) error {
	err := db.First(dst).Error

	if err == gorm.ErrRecordNotFound {
		return ErrNotFound
	}

	return err
}

// all will query using the provided gorm.DB and it
// will get all items returned and place it into
// dst. If nothing is found in the query, it will
// return ErrNotFound
func all(db *gorm.DB, dst interface{}) error {
	err := db.Find(dst).Error

	if err == gorm.ErrRecordNotFound {
		return ErrNotFound
	}

	return err
}

// findFollowers will join thequery using the provided gorm.DB
// and run sql joins on the provided tables
func findFollowers(db *gorm.DB, dst User, id uint) (*[]UserData, error) {
	results := make([]UserData, 0)
	s := db.Table("users").Select("users.id, users.email, users.first_name, users.last_name")
	j := s.Joins("JOIN followers ON followers.user_following_id = users.id")
	w := j.Where("followers.user_id = ?", id).Scan(&results)
	err := w.Find(dst).Error

	if err == gorm.ErrRecordNotFound {
		return nil, ErrNotFound
	}

	return &results, nil
}