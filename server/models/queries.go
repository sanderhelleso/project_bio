package models

import (
	"fmt"

	"../lib/parser"
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
		if reply, err := findCommentReply(db, comment.ID); err == nil {
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

// findCommentReply finds a comment replied to a given comments ID
func findRecomendations(db *gorm.DB, history []*PromoFromHist) ([]*Recomendation, error) {

	recomendations := make([]*Recomendation, 0)
	uniqueIds := make([]uint, 0)
	uniqueIds = append(uniqueIds, history[0].ID)

	// iterate over users history and find matches
	for _, promo := range history {

		// attempt to find matching
		p, err := findRecomendation(db, promo, &uniqueIds)

		// if unable to find, select random
		if err != nil {
			p, err = findRandomRecomendation(db, &uniqueIds)
			if err != nil {
				continue
			}
		}

		// add to map to preserve unique recomendations
		uniqueIds = append(uniqueIds, p.ID)
		recomendations = append(recomendations, p)
	}

	return recomendations, nil
}

// findRecomendations finds a recomendation similar to a promo
// the user previously watched based on their last viewed history
func findRecomendation(db *gorm.DB, promo *PromoFromHist, uniqueIds *[]uint) (*Recomendation, error) {

	var p Recomendation
	var keywords string

	cleaned := parser.CleanCommons(promo.Title)
	for i, word := range cleaned {
		if i < len(cleaned)-2 {
			keywords += fmt.Sprintf("%s|", word)
		} else {
			keywords += fmt.Sprintf("%s", word)
		}
	}

	where := fmt.Sprintf("promos.category = ? AND lower(title) similar to '%%(%s)%%'", keywords)

	query := db.
		Table("promos").
		Select("promos.id, promos.title, promos.description, profiles.handle, profiles.avatar").
		Joins("JOIN profiles ON profiles.id = promos.user_id").
		Not(*uniqueIds).
		Where(where, promo.Category)

	err := query.First(&p).Error

	if err == gorm.ErrRecordNotFound {
		return nil, ErrNotFound
	}

	return &p, nil
}

// findRandomRecomendation finds a random recomendation
func findRandomRecomendation(db *gorm.DB, uniqueIds *[]uint) (*Recomendation, error) {

	var p Recomendation

	query := db.
		Order(gorm.Expr("random()")).
		Limit(1).
		Table("promos").
		Select("promos.id, promos.title, promos.description, profiles.handle, profiles.avatar").
		Joins("JOIN profiles ON profiles.id = promos.user_id").
		Not(*uniqueIds)

	err := query.First(&p).Error

	if err == gorm.ErrRecordNotFound {
		return nil, ErrNotFound
	}

	return &p, nil
}

// findProductsPreviews finds a promos products images
func findProductsPreview(db *gorm.DB, id uint) ([]*PromoProduct, error) {

	var previews []*PromoProduct

	query := db.
		Table("promo_products").
		Select("image").
		Where("promo_id = ?", id)

	err := query.Find(&previews).Error

	if err == gorm.ErrRecordNotFound {
		return nil, ErrNotFound
	}

	return previews, nil
}

// findPromos will find  promos with within the offset -> limit range
// for a given profile provided with the ID
func findPromosByUserID(db *gorm.DB, userID, offset, limit uint) ([]*PromoPreview, error) {
	promos := []*PromoPreview{}

	query := db.
		Offset(offset).
		Limit(limit).
		Table("promos").
		Select("*").
		Where("user_id = ?", userID).
		Order("created_at desc")

	err := query.Find(&promos).Error

	if err == gorm.ErrRecordNotFound {
		return nil, ErrNotFound
	}

	for _, promo := range promos {
		if previews, err := findProductsPreview(db, promo.ID); err == nil {
			promo.Previews = previews;
		}
	}

	return promos, nil
}

// findRecentPromoByUserID finds the first and most recently posted promo
// for a given user identified by the passed in user ID
func findRecentPromoByUserID(db *gorm.DB, userID uint) (*PromoPreview, error) {
	var promo PromoPreview

	query := db.
		Table("promos").
		Select("*").
		Where("user_id = ?", userID).
		Order("created_at desc")

	err := query.First(&promo).Error

	if err == gorm.ErrRecordNotFound {
		return nil, ErrNotFound
	}

	if previews, err := findProductsPreview(db, promo.ID); err == nil {
		promo.Previews = previews;
	}

	return &promo, nil
}
