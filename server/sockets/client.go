package sockets

import (
	"net/http"
	"log"
	"fmt"
	"sync"
	"github.com/gorilla/websocket"
	"github.com/gomodule/redigo/redis"
)

type Client struct {
	ID string
	RedisConn *redis.Conn
	WsConn    *websocket.Conn
	Pool *Pool
}

type Message struct {
	Type int `json:"type"`
	Body string `json:"body"`
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.WsConn.Close()
	}()

	for {
		messageType, msg, err := c.WsConn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		message := Message{ messageType, string(msg) }
		c.Pool.Broadcast <- message
		fmt.Printf("Message recieved %+v\n", message)
	}
}