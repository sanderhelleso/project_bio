package redis

import (
	"github.com/gomodule/redigo/redis"
)

// Get excecutes the redis GET command with the 
// given key passed in
func Get(c *redis.Conn, key string, expecting string) (interface{}, error) {

	var (
		val interface{}
		err error
		conn = *c
	)

	switch expecting {
	case "string":
		val, err = redis.String(conn.Do("GET", key))

	case "int":
		val, err = redis.Int(conn.Do("GET", key))
	}

	if err != nil {
		return nil, err
	}

	return val, nil
}
