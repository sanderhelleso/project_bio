package models

import (
	"github.com/jinzhu/gorm"
	"time"
	"../lib/hash"
	"../lib/rand"
)

type accVerify struct {
	ID        	uint	`gorm:"primary_key"`
	UserID 		uint  	`gorm:"not null"`
	Token 		string 	`gorm:"-"`
	TokenHash 	string	`gorm:"not null;unique_index"`
	CreatedAt  	time.Time
}

type accVerifyDB interface {

	// methods for manipulating acc verifiations for a user
	ByToken(token string) (*accVerify, error)
	Create(accv *accVerify) error
	Delete(id uint) error
}

type accVerifyGorm struct {
	db *gorm.DB
}

func newAccVerifyValidator(db accVerifyDB, hmac hash.HMAC) *accVerifyValidator {
	return &accVerifyValidator {
		db,
		hmac,
	}
}

type accVerifyValidator struct {
	accVerifyDB
	hmac hash.HMAC
}

func (accvv *accVerifyValidator) ByToken(token string) (*accVerify, error) {
	accv := accVerify{Token: token}
	err := runAccVerifyValFns(&accv, accvv.hmacToken)
	if err != nil {
		return nil, err
	}

	return accvv.accVerifyDB.ByToken(accv.TokenHash)
}

func (accvg *accVerifyGorm) ByToken(tokenHash string) (*accVerify, error) {
	var accv accVerify
	err := first(accvg.db.Where("token_hash = ?", tokenHash), &accv)

	if err != nil {
		return nil, err
	}

	return &accv, nil
}


func (accvv *accVerifyValidator) Create(accv *accVerify) error {

	err := runAccVerifyValFns(accv, 
		accvv.requireUserID,
		accvv.setTokenIfUnset,
		accvv.hmacToken,
	)

	if err != nil {
		return err
	}

	return accvv.accVerifyDB.Create(accv)
}

func (accvv *accVerifyValidator) Delete(id uint) error {
	if id <= 0 {
		return ErrIDInvalid
	}

	return accvv.accVerifyDB.Delete(id)
}

func (accvg *accVerifyGorm) Create(accv *accVerify) error {
	return accvg.db.Create(accv).Error
}

func (accvg *accVerifyGorm) Delete(id uint) error {
	accv := accVerify{ID: id}
	return accvg.db.Delete(&accv).Error
}

type accVerifyValFn func(*accVerify) error

func runAccVerifyValFns(accv *accVerify, fns ...accVerifyValFn) error {
	for _, fn := range fns {
		if err := fn(accv); err != nil {
			return err
		}
	}

	return nil
}

func (accvv *accVerifyValidator) requireUserID(accv *accVerify) error {
	if accv.UserID <= 0 {
		return ErrUserIDRequired
	}

	return nil
}

func (accvv *accVerifyValidator) setTokenIfUnset(accv *accVerify) error {
	if accv.Token != "" {
		return nil
	}

	token, err := rand.RandomToken()
	if err != nil {
		return err
	}

	accv.Token = token
	return nil
}

func (accvv *accVerifyValidator) hmacToken(accv *accVerify) error {
	if accv.Token == "" {
		return nil
	}

	accv.TokenHash = accvv.hmac.Hash(accv.Token)
	return nil
}

