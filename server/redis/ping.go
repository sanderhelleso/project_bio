package redis

import (
	"fmt"
	"github.com/gomodule/redigo/redis"
)

// ping tests the connectivity for redis
//
// 'PONG' should be returned
func ping(c redis.Conn) error {

	// send PING command to rendis
	pong, err := c.Do("PING")
	if err != nil {
		return err
	}

	// PING command returns a redis "Simple String"
	// We use redis.String to convert interface to string
	s, err := redis.String(pong, err)
	if err != nil {
		return err
	}

	// should output 'PONG'
	fmt.Printf("PING Response: %s\n", s)

	return nil
}