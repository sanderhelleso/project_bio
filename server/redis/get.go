package redis

import (
	"fmt"
	"github.com/gomodule/redigo/redis"
)

// Get excecutes the redis GET command with the 
// given key passed in
func Get(c redis.Conn, key string, expecting string) (interface{}, error) {

	var (
		val interface{}
		err error
	)

	switch expecting {
	case "string":
		val, err = redis.String(c.Do("GET", key))

	case "int":
		val, err = redis.Int(c.Do("GET", key))
	}

	if err = checkRedisErr(key, err); err != nil {
		return nil, err
	}

	return val, nil
}

// checkRedisErr is a helper that validates 
// the error from the 'GET' command
func checkRedisErr(key string, err error) error {
	if err == redis.ErrNil {
		return fmt.Errorf("Error: Invalid key, %s does not exist", key)
	} else if err != nil {
		return err
	}

	return err
}