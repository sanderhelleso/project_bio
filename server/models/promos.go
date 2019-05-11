package models

import (
	"strings"
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// Promo represents a promotion in the application
type Promo struct {
	gorm.Model
	UserID      uint      `gorm:"not null;index" json:"-"`
	Title       string    `gorm:"not null;size:100" json:"title"`
	Description string    `gorm:"not null;size:500" json:"description"`
	Category    string    `gorm:"not null" json:"category"`
	Code        string    `json:"code"`
	Discount    uint      `json:"discount"`
	ExpiresAt   time.Time `json:"expires"`
}

// PromoFromHist represents a promotion from a users viewed history
type PromoFromHist struct {
	ID       uint
	Title    string `json:"title"`
	Category string `json:"category"`
}

// PromoDB is used to interact with the promos database
type PromoDB interface {

	// methods for quering promos
	ByID(id uint) (*Promo, error)

	// methods for altering promos
	Create(promo *Promo) (uint, error)
	Update(promo *Promo) error
	Delete(id uint) error
	FindRecomendations(history []*PromoFromHist) ([]*Promo, error)
	Seed()
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

	return &promoService{
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
	return &promoValidator{
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
		case "description":
			s = promo.Description
			e = ErrPromoDescriptionInvalid
			max = 500
		default:
			break
		}

		sLen := len(strings.TrimSpace(s))
		if sLen < min || sLen > max {
			return e
		}

		return nil
	})
}

func (pv *promoValidator) discountBetween() promoValFunc {
	return promoValFunc(func(promo *Promo) error {
		if promo.Discount != 0 {
			if promo.Discount < 0 || promo.Discount > 100 {
				return ErrPromoPercentageOffInvalid
			}

			return nil
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
func (pv *promoValidator) Create(promo *Promo) (uint, error) {
	err := runPromosValFunc(promo,
		pv.validateLength("title"),
		pv.validateLength("description"),
		pv.discountBetween(),
		pv.validateExpiresAt())

	if err != nil {
		return 0, err
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
		pv.discountBetween(),
		pv.validateExpiresAt())

	if err != nil {
		return err
	}

	return pv.PromoDB.Update(promo)
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
func (pg *promoGorm) Create(promo *Promo) (uint, error) {
	err := pg.db.Create(promo).Error
	return promo.ID, err
}

// Update will update the releated promo with all of the data
// in the provided promo object.
func (pg *promoGorm) Update(promo *Promo) error {
	return pg.db.Save(promo).Error
}

// Delete will delete the promo with the provided ID
func (pg *promoGorm) Delete(id uint) error {
	if id <= 0 {
		return ErrIDInvalid
	}

	promo := Promo{Model: gorm.Model{ID: id}}
	return pg.db.Delete(&promo).Error
}

// FindRecomendations ...
func (pg *promoGorm) FindRecomendations(history []*PromoFromHist) ([]*Promo, error) {
	recomendations, err := findRecomendations(pg.db, history)

	if err != nil {
		return nil, err
	}

	return recomendations, nil
}

// Seed creates test data for promo
func (pg *promoGorm) Seed() {

	/*for i := 0; i < 0; i++ {
		promo := &Promo{
			UserID:      1,
			Title:       fmt.Sprintf("I haz some Taco nr %d", i+1),
			Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas posuere diam justo, sed mattis odio imperdiet sit amet. Fusce semper ultrices neque ac semper.",
			Category:    "Food, Beverages & Tobacco",
			Code:        "TEST35",
			Discount:    50,
			ExpiresAt:   time.Date(2019, 10, 1, 12, 30, 0, 0, time.UTC),
		}

		pg.Create(promo)
	}*/

	promo1 := &Promo{
		UserID:      1,
		Title:       "I haz some Taco",
		Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas posuere diam justo, sed mattis odio imperdiet sit amet. Fusce semper ultrices neque ac semper.",
		Category:    "Food, Beverages & Tobacco",
		Code:        "TEST35",
		Discount:    50,
		ExpiresAt:   time.Date(2019, 10, 1, 12, 30, 0, 0, time.UTC),
	}

	promo2 := &Promo{
		UserID:      1,
		Title:       "xxxxxxxxxxxxxtacoxxxxxxxxxx",
		Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas posuere diam justo, sed mattis odio imperdiet sit amet. Fusce semper ultrices neque ac semper.",
		Category:    "Food, Beverages & Tobacco",
		Code:        "TEST35",
		Discount:    50,
		ExpiresAt:   time.Date(2019, 10, 1, 12, 30, 0, 0, time.UTC),
	}

	pg.Create(promo1)
	pg.Create(promo2)
}
