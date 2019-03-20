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

// join will join thequery using the provided gorm.DB
// and run sql joins on the provided tables
func findFollowers(db *gorm.DB, dst interface{}, id uint) error {
	join := db.Joins("JOIN followers ON followers.user_following_id = users.id")
	err := join.Where("followers.user_id = ?", id).Find(dst).Error

	if err == gorm.ErrRecordNotFound {
		return ErrNotFound
	}

	return err
}