package redis

import (
	"fmt"
	"github.com/gomodule/redigo/redis"
)

func get(c redis.Conn, key string, valType interface{}) (interface{}, error) {

	var val interface{}
	var err error
	
	switch valType.(type) {
	case string:
		val, err = redis.String(c.Do("GET", key))
		if err = checkRedisErr(key, err); err != nil {
			return nil, err
		}

	case int:
		val, err = redis.Int(c.Do("GET", key))
		if err = checkRedisErr(key, err); err != nil {
			return nil, err
		}
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