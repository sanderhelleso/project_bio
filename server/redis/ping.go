package redis

import (
	"fmt"
	"github.com/gomodule/redigo/redis"
)

// ping tests the connectivity for redis
//
// 'PONG' should be returned
func ping(c redis.Conn) error {

	// Send PING command to Redis
	// PING command returns a Redis "Simple String"
	// Use redis.String to convert the interface type to string
	pong, err := redis.String(c.Do("PING"))
	if err != nil {
		return err
	}

	// should output 'PONG'
	fmt.Printf("PING Response: %s\n", pong)

	return nil
}