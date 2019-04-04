package models

import (
	"time"
	"strings"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// Promo represents a promotion in the application
type Promo struct {
	gorm.Model
	UserID			uint 	`gorm:"not null;index"`
	Title			string 	`gorm:"not null;size:100"`
	Brand			string 	`gorm:"not null;size:100"`
	Description		string	`gorm:"not null"`
	Code			string  
	Discount		uint
	ExpiresAt		time.Time
}

// PromoDB is used to interact with the promos database
type PromoDB interface {

	// methods for quering promos
	ByID(id uint) (*Promo, error)

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

// ensure interface is matching
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

func runPromosValFunc(promo *Promo, fns ...promoValFunc) error {
	for _, fn := range fns {
		if err := fn(promo); err != nil {
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
func (pv *promoValidator) validateLength(field string) promoValFunc {
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

func (pv *promoValidator) idGreaterThan(n uint) promoValFunc {
	return promoValFunc(func(promo *Promo) error {
		if promo.ID <= n || promo.UserID <= n {
			return ErrIDInvalid
		}

		return nil
	})
}

func (pv *promoValidator) validateExpiresAt() promoValFunc {
	return promoValFunc(func(promo *Promo) error {
		if !promo.ExpiresAt.IsZero() {
			if promo.ExpiresAt.Before(time.Now()) {
				return ErrPromoExpiresAtInvalid
			}

			return nil
		}

		return nil
	})
}

// Create will validate and and backfill data
func (pv *promoValidator) Create(promo *Promo) error {
	err := runPromosValFunc(promo,
	pv.validateLength("title"),
	pv.validateLength("brand"),
	pv.validateLength("description"),
	pv.validateExpiresAt())

	if err != nil {
		return err
	}

	return pv.PromoDB.Create(promo)
}

// Update will validate update promo
func (pv *promoValidator) Update(promo *Promo) error {
	err := runPromosValFunc(promo,
	pv.idGreaterThan(0),
	pv.validateLength("title"),
	pv.validateLength("brand"),
	pv.validateLength("description"),
	pv.validateExpiresAt())

	if err != nil {
		return err
	}

	return pv.PromoDB.Update(promo)
}

// Delete will remove the provided Promo from the database,
// removing all traces of the Promo and its data
func (pv *promoValidator) Delete(id uint) error {
	var promo Promo
	promo.ID = id

	err := runPromosValFunc(&promo, pv.idGreaterThan(0))

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
func (pg *promoGorm) Create(promo *Promo) error {
	err := pg.db.Create(promo).Error
	return isDuplicateError(err, "promos")
}

// Update will update the releated promo with all of the data
// in the provided promo object.
func (pg *promoGorm) Update(promo *Promo) error {	
	return pg.db.Save(promo).Error
}


// Delete will delete the promo with the provided ID
func (pg *promoGorm) Delete(id uint) error {
	promo := Promo{Model: gorm.Model{ID: id}}
	return pg.db.Delete(&promo).Error
}

/*func (ppv *promoProductValidator) pricePercentageBetween() promoValFunc {
	return promoValFunc(func(promoProduct *PromoProduct) error {
		if promoProduct.Price != 0 {
			if promoProduct.PercantageOff < 0 || promoProduct.PercantageOff > 100 {
				return ErrPromoPercentageOffInvalid
			}

			return nil
		}

		return nil
	})
}*/