package models

import (
	"time"
	"strings"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// Promo represents a product promote in the application
type Promo struct {
	ID        		uint 	`gorm:"primary_key"`
	UserID			uint 	`gorm:"not null;index"`
	Title			string 	`gorm:"not null;size:100"`
	Brand			string 	`gorm:"not null;size:100"`
	Description		string	`gorm:"not null"`
	ImageURL		string	
	ProductURL		string	 
	Price			float32
	Currency		string
	PercantageOff	int	
	CreatedAt 		time.Time
	UpdatedAt 		time.Time
	ExpiresAt		time.Time
}

// PromoDB is used to interact with the promos database
type PromoDB interface {

	// methods for altering promos
	Create(promo *Promo) error
	Update(promo *Promo) error
	Delete(id uint) error
}

// PromoService is a set of methods used to mainpulate
// and work with the promos model
type PromoService interface {
	PromoDB
}

// ensure interface is mathing
var _ PromoService = &promoService{}

// implementation of interface
type promoService struct {
	PromoDB
}

// NewPromoService connect the Promo db and validator
func NewPromoService(db *gorm.DB) PromoService {
	pg := &promoGorm{db}
	pv := newPromoValidator(pg)

	return &promoService {
		PromoDB: pv,
	}
}

/******************* VALIDATORS **************************/

type promoValFunc func(*Promo) error

type promoValidator struct {
	PromoDB
}

func runPromosValFunc(Promo *Promo, fns ...promoValFunc) error {
	for _, fn := range fns {
		if err := fn(Promo); err != nil {
			return err
		}
	}

	return nil
}

func newPromoValidator(pdb PromoDB) *promoValidator {
	return &promoValidator {
		PromoDB: pdb,
	}
}

// takes 's' argument and validates 's' length after requirment
func (pv *promoValidator) validateLength(promo *Promo, field string) promoValFunc {
	return promoValFunc(func(promo *Promo) error {
		var s string
		var e error
		min, max := 2, 100
		switch field {
			case "title":
				s = promo.Title
				e = ErrPromoTitleInvalid
			case "brand":
				s = promo.Brand
				e = ErrPromoBrandInvalid
			case "description":
				s = promo.Description
				e = ErrPromoDescriptionInvalid
				max = 255
			default:
		}

		sLen := len(strings.TrimSpace(s))
		if sLen < min || sLen > max {
			return e
		}

		return nil
	})
}

// Create will validate and and backfill data
func (pv *promoValidator) Create(promo *Promo) error {
	err := runPromosValFunc(promo,
	pv.validateLength(promo, "title"),
	pv.validateLength(promo, "brand"),
	pv.validateLength(promo, "description"))
	if err != nil {
		return err
	}

	return pv.PromoDB.Create(promo)
}

// Delete will remove the provided Promo from the database,
// removing all traces of the Promo and its data
func (pv *promoValidator) Delete(id uint) error {
	var Promo Promo
	Promo.ID = id

	err := runPromosValFunc(&Promo,)
	if err != nil {
		return err
	}

	return pv.PromoDB.Delete(id)
}

/****************************************************************/

// ensure interface is matching
var _ PromoDB = &promoGorm{}

type promoGorm struct {
	db *gorm.DB
}

// ByID will look up a promo with the provided id
func (pg *promoGorm) ByID(id uint) (*Promo, error) {
	var promo Promo
	db := pg.db.Where("id = ?", id)
	err := first(db, &promo)
	return &promo, err
}

// Create will create the provided promo
func (pg *promoGorm) Create(Promo *Promo) error {
	err := pg.db.Create(Promo).Error
	return isDuplicateError(err, "promos")
}

// Update will update the releated promo with all of the data
// in the provided promo object.
func (pg *promoGorm) Update(promo *Promo) error {	
	return pg.db.Save(promo).Error
}


// Delete will delete the promo with the provided ID
func (pg *promoGorm) Delete(id uint) error {
	Promo := Promo{ID: id}
	return pg.db.Delete(&Promo).Error
}
