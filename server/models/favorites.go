package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// Favorite represents a promo favorite in the application
type Favorite struct {
	gorm.Model
	UserID 	uint `gorm:"not null;index" json:"-"`
	PromoID uint `gorm:"not null;index" json:"promoID"` 
}

// FavoriteDB is used to interact with the favorites database
type FavoriteDB interface {

	// methods for quering/checking favorites
	//ByUserID(id uint) (*Favorite, error)
	ByUserAndPromoID(userID, promoID uint) error

	// methods for altering favorites
	Create(favorite *Favorite) error
	Delete(id uint) error 
}

// FavoriteService is a set of methods used to manupulate
// and work with the favorites model
type FavoriteService interface {
	FavoriteDB
}

// ensure interface is matching
var _ FavoriteService = &favoriteService{}

// implementation of interface
type favoriteService struct {
	FavoriteDB
}

// NewFavoriteService connect the Favorite db and validator
func NewFavoriteService(db *gorm.DB) FavoriteService {
	fg := &favoriteGorm{db}
	fv := newFavoriteValidator(fg)

	return &favoriteService {
		FavoriteDB: fv,
	}
}

/******************* VALIDATORS **************************/

type favoriteValFunc func(*Favorite) error

type favoriteValidator struct {
	FavoriteDB
}

func runFavoritesValFunc(favorite *Favorite, fns ...favoriteValFunc) error {
	for _, fn := range fns {
		if err := fn(favorite); err != nil {
			return err
		}
	}

	return nil
}

func newFavoriteValidator(fdb FavoriteDB) *favoriteValidator {
	return &favoriteValidator {
		FavoriteDB: fdb,
	}
}

// Create will validate and and backfill data
func (fv *favoriteValidator) Create(favorite *Favorite) error {
	err := runFavoritesValFunc(favorite,)

	if err != nil {
		return err
	}

	return fv.FavoriteDB.Create(favorite)
}

/****************************************************************/

// ensure interface is matching
var _ FavoriteDB = &favoriteGorm{}

type favoriteGorm struct {
	db *gorm.DB
}

// ByUserAndPromoID looks up a favorite matching provided
// user ID and promotion ID
func (fg *favoriteGorm) ByUserAndPromoID(userID, promoID uint) error {
	db := fg.db.Where("user_id = ? AND promoID = ?", userID, promoID)
	return first(db, Favorite{})
}

// Create will create the provided favorite
func (fg *favoriteGorm) Create(favorite *Favorite) error {
	err := fg.db.Create(favorite).Error
	return err
}

// Delete will delete the favorite with the provided ID
func (fg *favoriteGorm) Delete(id uint) error {
	if id <= 0 {
		return ErrIDInvalid
	}
	
	favorite := Favorite{Model: gorm.Model{ID: id}}
	return fg.db.Delete(&favorite).Error
}

