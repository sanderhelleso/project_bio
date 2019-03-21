package models

import (
	"time"
	"github.com/jinzhu/gorm"

	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// Profile represents a users profile
type Profile struct {
	ID 				uint   `gorm:"primmary_key"`
	FirstName	    string `gorm:"size:35;not null"`
	LastName	   	string `gorm:"size:35;not null"`
	InstagramURL	string 
	UpdatedAt		time.Time
}

type ProfileDB interface {

}


type ProfileService interface {
	ProfileDB
}

// ensure interface is matching
var _ ProfileService = &profileService{}

// implementation of interface
type profileService struct {
	ProfileDB
}

// NewProfileService connect the user db and validator
func NewProfileService(db *gorm.DB) ProfileService {
	pg := &profileGorm{db}
	pv := newProfileValidator(pg)

	return &profileService{
		ProfileDB: pv,
	}
}

/******************* VALIDATORS **************************/

type profileValFunc func(*Profile) error

type profileValidator struct {
	ProfileDB
}

func runProfilesValFuncs(profile *Profile, fns ...profileValFunc) error {
	for _, fn := range fns {
		if err := fn(profile); err != nil {
			return err
		}
	}

	return nil
}

func newProfileValidator(pdb ProfileDB) *profileValidator {
	return &profileValidator{
		ProfileDB: pdb,
	}
}

// ensure interface is matching
var _ ProfileDB = &profileGorm{}

type profileGorm struct {
	db *gorm.DB
}