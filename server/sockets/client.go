package sockets

import (
	"log"
	"fmt"
	"github.com/gorilla/websocket"
)

type Client struct {
	ID 		string
	Conn   	*websocket.Conn
	Pool 	*Pool
}

type Message struct {
	Type int 	`json:"type"`
	Body string `json:"body"`
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()

	for {
		messageType, msg, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		message := Message{ messageType, string(msg) }
		c.Pool.Broadcast <- message
		fmt.Printf("Message recieved %+v\n", message)
	}
}