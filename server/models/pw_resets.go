package models

import (
	"github.com/jinzhu/gorm"
	"time"
	"../lib/hash"
	"../lib/rand"
)

type pwReset struct {
	ID        	uint	`gorm:"primary_key"`
	UserID 		uint  	`gorm:"not null"`
	Token 		string 	`gorm:"-"`
	TokenHash 	string	`gorm:"not null;unique_index"`
	CreatedAt  	time.Time
}

type pwResetDB interface {

	// methods for manipulating pw resets for a user
	ByToken(token string) (*pwReset, error)
	Create(pwr *pwReset) error
	Delete(id uint) error
}

type pwResetGorm struct {
	db *gorm.DB
}

func newPwResetValidator(db pwResetDB, hmac hash.HMAC) *pwResetValidator {
	return &pwResetValidator {
		db,
		hmac,
	}
}

type pwResetValidator struct {
	pwResetDB
	hmac hash.HMAC
}

func (pwrv *pwResetValidator) ByToken(token string) (*pwReset, error) {
	pwr := pwReset {Token: token}
	err := runPwResetValFns(&pwr, pwrv.hmacToken)
	if err != nil {
		return nil, err
	}

	return pwrv.pwResetDB.ByToken(pwr.TokenHash)
}

func (pwrg *pwResetGorm) ByToken(tokenHash string) (*pwReset, error) {
	var pwr pwReset
	err := first(pwrg.db.Where("token_hash = ?", tokenHash), &pwr)

	if err != nil {
		return nil, err
	}

	return &pwr, nil
}


func (pwrv *pwResetValidator) Create(pwr *pwReset) error {

	err := runPwResetValFns(pwr, 
		pwrv.requireUserID,
		pwrv.setTokenIfUnset,
		pwrv.hmacToken,
	)

	if err != nil {
		return err
	}

	return pwrv.pwResetDB.Create(pwr)
}

func (pwrv *pwResetValidator) Delete(id uint) error {
	if id <= 0 {
		return ErrIDInvalid
	}

	return pwrv.pwResetDB.Delete(id)
}

func (pwrg *pwResetGorm) Create(pwr *pwReset) error {
	return pwrg.db.Create(pwr).Error
}

func (pwrg *pwResetGorm) Delete(id uint) error {
	pwr := pwReset{ID: id}
	return pwrg.db.Delete(&pwr).Error
}

type pwResetValFn func(*pwReset) error

func runPwResetValFns(pwr *pwReset, fns ...pwResetValFn) error {
	for _, fn := range fns {
		if err := fn(pwr); err != nil {
			return err
		}
	}

	return nil
}

func (pwrv *pwResetValidator) requireUserID(pwr *pwReset) error {
	if pwr.UserID <= 0 {
		return ErrUserIDRequired
	}

	return nil
}

func (pwrv *pwResetValidator) setTokenIfUnset(pwr *pwReset) error {
	if pwr.Token != "" {
		return nil
	}

	token, err := rand.RememberToken()
	if err != nil {
		return err
	}

	pwr.Token = token
	return nil
}

func (pwrv *pwResetValidator) hmacToken(pwr *pwReset) error {
	if pwr.Token == "" {
		return nil
	}

	pwr.TokenHash = pwrv.hmac.Hash(pwr.Token)
	return nil
}

