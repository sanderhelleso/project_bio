package redis

import (
	"github.com/gomodule/redigo/redis"
)

// Delete excecutes the redis Delete command
// with the given key passed in, removing key and val
func Delete(c *redis.Conn, key string) error {
	conn := *c
    _, err := conn.Do("DEL", key)
    return err
}