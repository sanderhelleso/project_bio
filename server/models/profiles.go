package models

import (
	"time"
	"github.com/jinzhu/gorm"
	"strings"
	"net/url"
	"../lib/parser"

	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// Profile represents a users profile
type Profile struct {
	ID 				uint   	`gorm:"primmary_key"`
	UserID			uint   	`gorm:"not null;unique"`
	Handle			string  `gorm:"size:30;not null;unique_index"`
	Name		    string 	`gorm:"size:70;not null"`
	Bio				string  `gorm:"size:150"`
	Avatar 			string  `gorm:"unique"`
	InstagramURL	string  
	UpdatedAt		time.Time
}

type ProfileDB interface {

	// Methods for quering a single profile
	ByUserID(id uint) (*Profile, error)
	ByHandle(handle string) (*Profile, error)

	// methods for altering profiles
	Create(profile *Profile) error
	Update(profile *Profile) error
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

func (pv *profileValidator) ByUserID(id uint) (*Profile, error) {
	profile := Profile {
		UserID: id,
	}

	err := runProfilesValFuncs(&profile,
	pv.idGreaterThan(0))

	if err != nil {
		return nil, err
	}

	return pv.ProfileDB.ByUserID(profile.UserID)
}

func (pv *profileValidator) ByHandle(handle string) (*Profile, error) {
	profile := Profile {
		Handle: handle,
	}

	err := runProfilesValFuncs(&profile,
	pv.normalizeHandle)

	if err != nil {
		return nil, err
	}

	return pv.ProfileDB.ByHandle(profile.Handle)
}

func (pv *profileValidator) Create(profile *Profile) error {
	err := runProfilesValFuncs(profile,
	pv.normalizeHandle,
	pv.validateHandle,
	pv.validateName,
	pv.validateBio,
	pv.validateInstagramURL)

	if err != nil {
		return err
	}

	return pv.ProfileDB.Create(profile)
}

func (pv *profileValidator) Update(profile *Profile) error {
	err := runProfilesValFuncs(profile,
	pv.normalizeHandle,
	pv.validateHandle,
	pv.validateName,
	pv.validateBio,
	pv.validateInstagramURL)

	if err != nil {
		return err
	}

	return pv.ProfileDB.Update(profile)
}


func (pv *profileValidator) idGreaterThan(n uint) profileValFunc {
	return profileValFunc(func(profile *Profile) error {
		if profile.ID <= n {
			return ErrIDInvalid
		}

		return nil
	})
}

func (pv *profileValidator) normalizeHandle(profile *Profile) error {
	profile.Handle = strings.TrimSpace(strings.ToLower(profile.Handle))
	return nil
}

func (pv *profileValidator) validateHandle(profile *Profile) error {
	if len(profile.Handle) == 0 {
		return ErrProfileHandleRequired
	}

	if len(profile.Handle) < 2 || len(profile.Handle) > 30 {
		return ErrProfileHandleInvalid
	}

	return nil
}

func (pv *profileValidator) validateName(profile *Profile) error {
	if len(strings.TrimSpace(profile.Name)) == 0 {
		return ErrProfileNameRequired
	}

	if len(profile.Name) < 2 || len(profile.Name) > 70 {
		return ErrProfileNameInvalid
	}

	return nil
}

func (pv *profileValidator) validateBio(profile *Profile) error {
	if len(strings.TrimSpace(profile.Bio)) != 0 {

		if len(profile.Bio) > 150 {
			return ErrProfileBioInvalid
		}
	}

	return nil
}

// ensure that provided url is valid and from instagram domain
func (pv *profileValidator) validateInstagramURL(profile *Profile) error {
	if len(strings.TrimSpace(profile.InstagramURL)) != 0 {

		u, err := url.ParseRequestURI(profile.InstagramURL)
		if err != nil {
			return ErrProfileInstagramURLInvalid
		}

		if parser.GetDomainNameFromURL(u) != "instagram.com" {
			return ErrProfileInstagramURLInvalid
		}
	}
	
	return nil
}


// ensure interface is matching
var _ ProfileDB = &profileGorm{}

type profileGorm struct {
	db *gorm.DB
}

func (pg *profileGorm) ByUserID(id uint) (*Profile, error) {
	var profile Profile
	db := pg.db.Where("user_id = ?", id)
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

// Update will update the provided profile with all of the
// data in the provided profule object
func (pg *profileGorm) Update(profile *Profile) error {
	return pg.db.Save(profile).Error
}
