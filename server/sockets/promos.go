package sockets

import (
	"github.com/gin-gonic/gin"
	"log"
	"github.com/gorilla/websocket"

)

// WsPromos creates a connection to any valid endpoints
// matching the sat route prefix of /sockets/promos/:id
func wsPromos(c *gin.Context) {

	ws, err := createConnection(c)
	if err != nil {
		log.Println("Unable to establish connection...")
		return
	}

	log.Println("Client connected...")

	// listen indefinitely for new messages coming
    // through on our WebSocket connection
	reader(ws)
}

// define a reader which will listen for
// new messages being sent to our WebSocket
// endpoint
func reader(conn *websocket.Conn) {
	for {

		// handle read messages from client
		messageType, p, err := conn.ReadMessage()

		// handles errors for read
		if err != nil {
			log.Println(err)
			return
		}

		// log recieved message
		log.Println(string(p))

		// handle write messages to client
		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}

	}
}