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

// findFollowing will find all users that the user with provided id is following
func findFollowing(db *gorm.DB, dst User, id uint) (*[]UserData, error) {
	results := make([]UserData, 0)
	s := db.Table("users").Select("users.id, users.email, users.first_name, users.last_name")
	j := s.Joins("JOIN followers ON followers.user_following_id = users.id")
	w := j.Where("followers.user_id = ?", id).Scan(&results)
	o := w.Order("followers.created_at desc")
	err := o.Find(dst).Error

	if err == gorm.ErrRecordNotFound {
		return nil, ErrNotFound
	}

	return &results, nil
}

// findFollowers will find all users that is following the user with the provided user id
func findFollowers(db *gorm.DB, dst User, id uint) (*[]UserData, error) {
	results := make([]UserData, 0)
	s := db.Table("users").Select("users.id, users.email, users.first_name, users.last_name")
	j := s.Joins("JOIN followers ON followers.user_id = users.id")
	w := j.Where("followers.user_following_id = ?", id).Scan(&results)
	o := w.Order("followers.created_at desc")
	err := o.Find(dst).Error

	if err == gorm.ErrRecordNotFound {
		return nil, ErrNotFound
	}

	return &results, nil
}

// findCommentsAndUser will find comments with its posters data within the offset -> limit range
// for a given promotion provided with the ID
func findCommentsAndUser(db *gorm.DB, id, offset, limit uint) ([]*PromoCommentWithUser, error) {
	comments := []*PromoCommentWithUser{}

	query := db.
		Offset(offset).
		Limit(limit).
		Table("promo_comments").
		Select("promo_comments.id, promo_comments.created_at, promo_comments.body, profiles.avatar, profiles.handle").
		Joins("JOIN profiles ON profiles.id = promo_comments.user_id").
		Where("promo_comments.promo_id = ? AND promo_comments.response_to_id = ?", id, 0).
		Order("promo_comments.created_at desc")

	err := query.Find(&comments).Error

	if err == gorm.ErrRecordNotFound {
		return nil, ErrNotFound
	}

	// check if comment has a reply, if found - add to model
	for _, comment := range comments {
		if reply, err := findCommentReply(db, comment.ID); err == nil  {
			comment.Reply = reply
		}
	}

	return comments, nil
}

// findCommentReply finds a comment replied to a given comments ID
func findCommentReply(db *gorm.DB, id uint) (*PromoCommentWithUser, error) {
	var reply PromoCommentWithUser

	query := db.
		Table("promo_comments").
		Select("promo_comments.id, promo_comments.created_at, promo_comments.body, profiles.avatar, profiles.handle").
		Joins("JOIN profiles ON profiles.id = promo_comments.user_id").
		Where("promo_comments.response_to_id = ?", id)

	err := query.First(&reply).Error

	if err == gorm.ErrRecordNotFound {
		return nil, ErrNotFound
	}

	return &reply, nil
}