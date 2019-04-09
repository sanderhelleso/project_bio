package redis

import (
	"github.com/gomodule/redigo/redis"
)

// Set excecutes the redis SET command with the 
// given key and value passed in
func Set(c redis.Conn, key string, val interface{}) error {

	_, err := c.Do("SET", key, val)
	if err != nil {
		return err
	}


	return nil
}
