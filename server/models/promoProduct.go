package models

import (
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
	ByID(id uint) (*PromoProduct, error)
	ByPromoID(id uint) (*PromoProduct, error)

	// methods for altering promo products
	Create(promoProduct *PromoProduct) error
	Update(promoProduct *PromoProduct) error
	Delete(id uint) error
}

// PromoProductService is a set of methods used to manipulate
// and work with the promoProducts model
type PromoProductService interface {
	PromoProductDB
}

// implementation of interface
type promoProductService struct {
	PromoProductDB
}

// ensure interface is matching
var _PromoProductService = &promoProductService{}

// NewPromoProductService connects the PromoProduct db and validator
func NewPromoProductService(db *gorm.DB) PromoProductService {
	ppg := &promoProductGorm{db}
	ppv := newPromoProductValidator(ppg)

	return &promoProductService {
		PromoProductDB: ppv,
	}
}

/******************* VALIDATORS **************************/

type promoProductValFunc func(*PromoProduct) error

type promoProductValidator struct {
	PromoProductDB
}

func runPromoProductsValFunc(promoProduct *PromoProduct, fns ...promoProductValFunc) error {
	for _, fn := range fns {
		if err := fn(promoProduct); err != nil {
			return err
		}
	}

	return nil
}

func newPromoProductValidator(ppdb PromoProductDB) *promoProductValidator {
	return &promoProductValidator {
		PromoProductDB: ppdb,
	}
}


func (ppv *promoProductValidator) normalizePrice(promoProduct *PromoProduct) error {
	promoProduct.Price = parser.RoundFloat64(promoProduct.Price)
	return nil
}

func (ppv *promoProductValidator) normalizeCurrency(promoProduct *PromoProduct) error {
	promoProduct.Currency = strings.ToUpper(promoProduct.Currency)
	return nil
}

func (ppv *promoProductValidator) validateCurrency() promoProductValFunc {
	return promoProductValFunc(func(promoProduct *PromoProduct) error {
		if len(strings.TrimSpace(promoProduct.Currency)) != 3 {
			return ErrPromoCurrencyInvalid
		}

		return nil
	})
}

/****************************************************************/

type promoProductGorm struct {
	db *gorm.DB
}

// ensure interface is matching
var _ PromoProductDB = &promoProductGorm{}

// ByID will look up a promo product with the provided id
func (ppg *promoProductGorm) ByID(id uint) (*PromoProduct, error) {
	var promoProduct PromoProduct
	db := ppg.db.Where("id = ?", id)
	err := first(db, &promoProduct)
	return &promoProduct, err
}

// ByPromoID will look up a promo product with the provided promos id
func (ppg *promoProductGorm) ByPromoID(id uint) (*PromoProduct, error) {
	var promoProduct PromoProduct
	db := ppg.db.Where("promo_id = ?", id)
	err := first(db, &promoProduct)
	return &promoProduct, err
}

// Create will create the provided promo product
func (ppg *promoProductGorm) Create(promoProduct *PromoProduct) error {
	err := ppg.db.Create(promoProduct).Error
	return isDuplicateError(err, "promoProducts")
}

// Update will update the releated promo product with all of the data
// in the provided promo product object.
func (ppg *promoProductGorm) Update(promoProduct *PromoProduct) error {	
	return ppg.db.Save(promoProduct).Error
}


// Delete will delete the promo product with the provided ID
func (ppg *promoProductGorm) Delete(id uint) error {
	promoProduct := PromoProduct{Model: gorm.Model{ID: id}}
	return ppg.db.Delete(&promoProduct).Error
}



