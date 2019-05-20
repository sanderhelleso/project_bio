package models 

import (
	"github.com/jinzhu/gorm"
)

// Connection represents a profiles connection to a social media platform
// eg: A connection is a link with icon and link to instagram/facebook etc
type Connection struct {
	ID uint `gorm:"primary_key"`
	UserID uint `gorm:"not null;unique_index"`
	Media string `gorm:"not null"`
	URL string `gorm:"not null"`
	Text string `gorm:"not null"`
}

// ConnectionDB is used to interfact with the connection database
type ConnectionDB interface {

	// methods for manipulating and looking up connections
	ByUserID(id uint) []*Connection
	Create(connection *Connection) error
}

// ConnectionService is a set of methods used to manipulate
// and work with the connection model
type ConnectionService interface {
	ConnectionDB
}

// ensure interface is matching
var _ ConnectionService = &connectionService{}

// implementation of interface
type connectionService struct {
	ConnectionDB
}

// NewConnectionService connect the Connection db and validator
func NewConnectionService(db *gorm.DB) ConnectionService {
	cg := &connectionGorm{db}
	cv := newConnectionValidator(cg)

	return &connectionService {
		ConnectionDB: cv,
	}
}

/******************* VALIDATORS **************************/

type connectionValFunc func(*Connection) error

type connectionValidator struct {
	ConnectionDB
}

func runConnectionsValFunc(connection *Connection, fns ...connectionValFunc) error {
	for _, fn := range fns {
		if err := fn(connection); err != nil {
			return err
		}
	}

	return nil
}

func newConnectionValidator(cdb ConnectionDB) *connectionValidator {
	return &connectionValidator {
		ConnectionDB: cdb,
	}
}

// Create will validate and and backfill data
func (cv *connectionValidator) Create(connection *Connection) error {
	err := runConnectionsValFunc(connection,)

	if err != nil {
		return err
	}

	return cv.ConnectionDB.Create(connection)
}

/****************************************************************/

// ensure interface is matching
var _ ConnectionDB = &connectionGorm{}

type connectionGorm struct {
	db *gorm.DB
}

func (cg *connectionGorm) ByUserID(userID uint) []*Connection {
	connections := make([]*Connection, 0)
	cg.db.Where("user_id = ?", userID).Find(&connections)
	return connections
}

// Create will create the provided connection
func (cg *connectionGorm) Create(connection *Connection) error {
	err := cg.db.Create(connection).Error
	return err
}

