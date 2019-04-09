package redis

import (
	"github.com/gomodule/redigo/redis"
)

// NewPool creates a new redis pool
func NewPool() *redis.Pool {

	return &redis.Pool {
		// maximum numbers of idle connections in the pool
		MaxIdle: 80,

		// maximum number of connections
		MaxActive: 12000,

		Dial: func() (redis.Conn, error) {
			c, err := redis.Dial("tcp", ":6379")
			if err != nil {
				panic(err.Error())
			}

			return c, err
		},
	}	
}