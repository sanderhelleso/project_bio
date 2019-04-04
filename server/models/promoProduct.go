package models

import (
	"time"
	"strings"
	"github.com/jinzhu/gorm"
	"../lib/parser"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// PromoProduct represents a product in a promotion in the application
type PromoProduct struct {
	gorm.Model
	PromoID		uint 	`gorm:"not null;index"`
	Name 		string	`gorm:"not null;size:100"`
	Brand 		string  `gorm:"not null;size:100"` 
	Link		string  `gorm:"not null"`
	Image		string  `gorm:"not null;unique"` 
	Price		float64 `gorm:"not null"`
	Currency    string  `gorm:"not null;size:3"`  
}

type PromoProductDB interface {

	// methods for quering specific promo products
	ByID(id uint) (*Promo, error)
	ByPromo(id uint) (*Promo, error)

	// methods for altering promo products
	Create(*promoProduct *PromoProduct) error
	Update(*promoProduct *PromoProduct) error
	Delete(id uint) error
}

// PromoProductService is a set of methods used to manipulate
// and work with the promoProducts model
type PromoProductService interface {
	PromoProductDB
}

// implementation of interface
type promoProductService struct {
	PromoDB
}

// ensure interface is matching
var _PromoProductService = &promoProductService{}

// NewPromoProductServie connects the PromoProduct db and validator
func NewPromoProductService(db *gorm.DB) PromoProductService {
	ppg := &promoProductGorm{db}
	ppv := &newPromoProductValidator(ppg)

	return &promoProductService {
		PromoProductDB: ppv,
	}
}

/******************* VALIDATORS **************************/

type promoProductValFunc func(*PromoProduct) error

type promoProductValidator struct {
	PromoProductDB
}

func runPromoProductsValFunc(PromoProduct *PromoProduct, fns ...promoProductValFunc) error {
	for _fn := range fns {
		if err := fn(PromoProduct); err != nil {
			return err
		}
	}

	return nil
}

func newPromoProductsValidator(ppdb PromoProductDB) *promoProductValidator {
	return &promoProductValidator {
		PromoProductDB: ppdb,
	}
}


func (ppv *promoProductValidator) normalizePrice(promoProduct *PromoProduct) error {
	promoProductPrice = parser.RoundFloat64(promoProductPrice)
	return nil
}

func (ppv *promoProductValidator) pricePercentageBetween() promoValFunc {
	return promoValFunc(func(promoProduct *PromoProduct) error {
		if promoProductPrice != 0 {
			if promoProductPercantageOff < 0 || promoProductPercantageOff > 100 {
				return ErrPromoPercentageOffInvalid
			}

			return nil
		}

		return nil
	})
}

func (ppv *promoProductValidator) normalizeCurrency(promoProduct *PromoProduct) error {
	promoProductCurrency = strings.ToUpper(promoProductCurrency)
	return nil
}

func (ppv *promoProductValidator) validateCurrency() promoValFunc {
	return promoValFunc(func(promoProduct *PromoProduct) error {
		if promoProductPrice != 0 {
			if len(strings.TrimSpace(promoProductCurrency)) != 3 {
				return ErrPromoCurrencyInvalid
			}

			return nil
		}

		return nil
	})
}
