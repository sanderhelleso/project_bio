package sockets

import (
	"github.com/gin-gonic/gin"
	"log"
	"fmt"
	//"../lib/parser"
	"strconv"
	"github.com/gorilla/websocket"
	"github.com/gomodule/redigo/redis"
	r "../redis"
)

// WsPromos creates a connection to any valid endpoints
// matching the sat route prefix of /sockets/promos/:id
func (client *client) wsPromos(c *gin.Context)  {

	ws, err := createConnection(c)
	if err != nil {
		log.Println("Unable to establish connection...")
		return
	}

	log.Println("Client connected...")

	// get current socket id from req context
	promoID := fmt.Sprintf("promos/%s", c.Param("id"))
	log.Println(promoID)

	// new client connected, update redis cache with added value
	numCons, err := r.Get(client.conn, promoID, "int")
	if err != nil && err == redis.ErrNil {

		// no value stored with the promos id, set initial value
		err := r.Set(client.conn, promoID, 1)
		if err != nil {
			return
		}

		numCons = 1
	}

	// send back the number of connections to current promo, back to client
	//err = ws.WriteMessage(1, parser.MakeIntBytes(numCons.(int)))
	log.Println(numCons)

	s := strconv.Itoa(numCons.(int))
	err = ws.WriteMessage(1, []byte(s))

	// listen indefinitely for new messages coming
    // through on our WebSocket connection
	reader(ws, client.conn, numCons.(int))
}

// define a reader which will listen for
// new messages being sent to our WebSocket
// endpoint
func reader(wsConn *websocket.Conn, redisConn *redis.Conn, numCons int) {
	for {

		// handle messages to be recieved from client
		messageType, p, err := wsConn.ReadMessage()

		// handles errors for read
		if err != nil {
			log.Println(err)
			return
		}

		// log recieved message
		log.Println(string(p))

		// handle messages to be writen to client
		if err := wsConn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}

	}
}