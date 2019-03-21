package models

import (
	"time"
	"github.com/jinzhu/gorm"

	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// Profile represents a users profile
type Profile struct {
	ID 				uint   	`gorm:"primmary_key"`
	UserID			uint   	`gorm:"not null;unique"`
	Handle			string  `gorm:"size:30;not null;unique_index"`
	FirstName	    string 	`gorm:"size:35;not null"`
	LastName	   	string 	`gorm:"size:35;not null"`
	InstagramURL	string 
	UpdatedAt		time.Time
}

type ProfileDB interface {

	// Methods for quering a single profile
	ByID(id uint) (*Profile, error)
	ByHandle(handle string) (*Profile, error)

	// methods for altering profiles
	Create(profile *Profile) error
	//Update(profile *Profile) error
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

func (pv *profileValidator) ByID(id uint) (*Profile, error) {
	profile := Profile {
		ID: id,
	}

	err := runProfilesValFuncs(&profile,
	pv.idGreaterThan(0))

	if err != nil {
		return nil, err
	}

	return pv.ProfileDB.ByID(profile.ID)
}

func (pv *profileValidator) ByHandle(handle string) (*Profile, error) {
	profile := Profile {
		Handle: handle,
	}

	err := runProfilesValFuncs(&profile,)

	if err != nil {
		return nil, err
	}

	return pv.ProfileDB.ByHandle(profile.Handle)
}

func (pv *profileValidator) Create(profile *Profile) error {
	err := runProfilesValFuncs(profile,)

	if err != nil {
		return err
	}

	return pv.ProfileDB.Create(profile)
}

func (pv *profileValidator) idGreaterThan(n uint) profileValFunc {
	return profileValFunc(func(profile *Profile) error {
		if profile.ID <= n {
			return ErrIDInvalid
		}

		return nil
	})
}


// ensure interface is matching
var _ ProfileDB = &profileGorm{}

type profileGorm struct {
	db *gorm.DB
}

func (pg *profileGorm) ByID(id uint) (*Profile, error) {
	var profile Profile
	db := pg.db.Where("profile_id = ?", id)
	err := first(db, &profile)
	return &profile, err
}

func (pg *profileGorm) ByHandle(handle string) (*Profile, error) {
	var profile Profile
	db := pg.db.Where("handle = ?", handle)
	err := first(db, &profile)
	return &profile, err
}

func (pg *profileGorm) Create(profile *Profile) error {
	err := pg.db.Create(profile).Error
	return isDuplicateError(err, "profiles")
}