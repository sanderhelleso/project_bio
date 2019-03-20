package models

import (
	"time"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// Follower represents a follower of a user in the application
type Follower struct {
	ID        		uint `gorm:"primary_key"`
	UserID			uint `gorm:"not null;unique_index:idx_follow_code;"`
	UserFollowingID uint `gorm:"not null;unique_index:idx_follow_code;"`
	CreatedAt  time.Time
}

// FollowerDB is used to interact with the followers database
type FollowerDB interface {

	// methods for quering follower(s)
	ByUserID(id uint) (*[]UserData, error)
	ByUserFollowingID(id uint) (*[]UserData, error)

	// methods for altering followers
	Create(follower *Follower) error
	Delete(id uint) error
}

// FollowerService is a set of methods used to mainpulate
// and work with the followers model
type FollowerService interface {
	FollowerDB
}

// ensure interface is mathing
var _ FollowerService = &followerService{}

// implementation of interface
type followerService struct {
	FollowerDB
}

// ensure interface is matching
var _ FollowerService = &followerService{}

// NewFollowerService connect the follower db and validator
func NewFollowerService(db *gorm.DB) FollowerService {
	fg := &followerGorm{db}
	fv := newFollowerValidator(fg)

	return &followerService {
		FollowerDB: fv,
	}
}

/******************* VALIDATORS **************************/

type followerValFunc func(*Follower) error

type followerValidator struct {
	FollowerDB
}

func runFollowersValFunc(follower *Follower, fns ...followerValFunc) error {
	for _, fn := range fns {
		if err := fn(follower); err != nil {
			return err
		}
	}

	return nil
}

func newFollowerValidator(fdb FollowerDB) *followerValidator {
	return &followerValidator {
		FollowerDB: fdb,
	}
}

// Create will validate and and backfill data
func (fv *followerValidator) Create(follower *Follower) error {
	err := runFollowersValFunc(follower,)
	if err != nil {
		return err
	}

	return fv.FollowerDB.Create(follower)
}

// Delete will remove the provided follower from the database,
// removing all traces of the follower and its data
func (fv *followerValidator) Delete(id uint) error {
	var follower Follower
	follower.ID = id

	err := runFollowersValFunc(&follower,)
	if err != nil {
		return err
	}

	return fv.FollowerDB.Delete(id)
}

/****************************************************************/

// ensure interface is matching
var _ FollowerDB = &followerGorm{}

type followerGorm struct {
	db *gorm.DB
}

// ByUserID will look up users the user with the provided id is following
func (fg *followerGorm) ByUserID(id uint) (*[]UserData, error) {
	var user User
	following, err := findFollowing(fg.db, user, id)
	return following, err
}

// ByUserFollowingID will look up users that is following the user with the provided id
func (fg *followerGorm) ByUserFollowingID(id uint) (*[]UserData, error) {
	var user User
	following, err := findFollowers(fg.db, user, id)
	return following, err
}

// Create will create the provided follower releationship
func (fg *followerGorm) Create(follower *Follower) error {
	return fg.db.Create(follower).Error
}

//Delete will delete the follower with the provided ID
func (fg *followerGorm) Delete(id uint) error {
	follower := Follower{ID: id}
	return fg.db.Delete(&follower).Error
}
