package sockets

import (
	"log"
	"fmt"
	"github.com/gorilla/websocket"
)

// Client represents a client pressent in a socket pool
// A client contains an ID, a socket connection and
// the current pool the user should be included in
type Client struct {
	ID 		string
	Conn   	*websocket.Conn
	Pool 	*Pool
}

// Message represents a message sent to a socket pools
// client connections. The type indicates the type 
// of message to be sent (1 = TextMessage)
type Message struct {
	Type int 	`json:"type"`
	Body string `json:"body"`
}

// Read start to listen for incoming messages and read them in
// from the clients connected connection pool
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