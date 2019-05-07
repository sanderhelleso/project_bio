package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"time"
)

// PromoComment represents a comment releated to a promo
type PromoComment struct {
	gorm.Model
	UserID       uint   `gorm:"not null;index" json:"-"`
	PromoID      uint   `gorm:"not null;index" json:"-"`
	ResponseToID uint   `json:"-"`
	Body         string `gorm:"not null;" json:"body"`
}

type PromoCommentWithUser struct {
	Created_at  time.Time `json:"createdAt"`
	Handle  	string 	  `json:"handle"`
	Avatar 		string 	  `json:"avatar"`
	Body 		string    `json:"body"`
}

type PromoCommentDB interface {

	// method for quering specific promo comments
	ByPromoID(id, offset, limit uint) ([]*PromoCommentWithUser, error)
	ByResponseToID(id uint) (*PromoComment, error)
	
	// aggregates
	Count(id uint) (uint, error)

	// methods for altering promo comments
	Create(promoComment *PromoComment) error
	Delete(id uint) error
}

// PromoCommentService is a set of methods used to manipulate
// and work with the promoComments model
type PromoCommentService interface {
	PromoCommentDB
}

// implementation of interface
type promoCommentService struct {
	PromoCommentDB
}

// ensure interface is matching
var _ PromoCommentService = &promoCommentService{}

// NewPromoCommentService connects the PromoComment db and validator
func NewPromoCommentService(db *gorm.DB) PromoCommentService {
	pcg := &promoCommentGorm{db}
	pcv := newPromoCommentValidator(pcg)

	return &promoCommentService{
		PromoCommentDB: pcv,
	}
}

/******************* VALIDATORS **************************/

type promoCommentValFunc func(*PromoComment) error

type promoCommentValidator struct {
	PromoCommentDB
}

func runPromoCommentsValFunc(promoComment *PromoComment, fns ...promoCommentValFunc) error {
	for _, fn := range fns {
		if err := fn(promoComment); err != nil {
			return err
		}
	}

	return nil
}

func newPromoCommentValidator(pcdb PromoCommentDB) *promoCommentValidator {
	return &promoCommentValidator{
		PromoCommentDB: pcdb,
	}
}

// Create will validate and backfill data
func (pcv *promoCommentValidator) Create(promoComment *PromoComment) error {
	err := runPromoCommentsValFunc(promoComment)

	if err != nil {
		return err
	}

	return pcv.PromoCommentDB.Create(promoComment)
}

/****************************************************************/

type promoCommentGorm struct {
	db *gorm.DB
}

// ensure interface is matching
var _ PromoCommentDB = &promoCommentGorm{}

// ByPromoID will look up a promo comment with the provided promo id
func (pcg *promoCommentGorm) ByPromoID(id, offset, limit uint) ([]*PromoCommentWithUser, error) {
	comments, err := findCommentsAndUser(pcg.db, id, offset, limit)
	return comments, err
}

// ByResponseID will look up a promo comment with the provided responseTo promo id
func (pcg *promoCommentGorm) ByResponseToID(id uint) (*PromoComment, error) {
	var promoComment *PromoComment
	db := pcg.db.Where("response_to_id = ?", id)
	err := first(db, &promoComment)
	return promoComment, err
}

// Count counts the number of records matching the proved promo ID
func (pcg *promoCommentGorm) Count(id uint) (uint, error) {
	var count uint
	err := pcg.db.Where("promo_id = ? AND response_to_id = 0", id).Count(&count).Error
	return count, err
}

// Create will create the provided promo comment
func (pcg *promoCommentGorm) Create(promoComment *PromoComment) error {
	err := pcg.db.Create(promoComment).Error
	return err
}

// Delete will delete the promo comment with the provided ID
func (pcg *promoCommentGorm) Delete(id uint) error {
	if id <= 0 {
		return ErrIDInvalid
	}

	promoComment := PromoComment{Model: gorm.Model{ID: id}}
	return pcg.db.Delete(&promoComment).Error
}
