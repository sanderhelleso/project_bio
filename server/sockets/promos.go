package sockets

import (
	"github.com/gin-gonic/gin"
	"log"
	"fmt"
	//"io"
	//"github.com/gorilla/websocket"
	"github.com/gomodule/redigo/redis"
	//p "../lib/parser"
	//r "../redis"
)

// PromoConn represents a connection to a promo
// socket handler, containing a redis conn and
// a map of all active pools for the handler
type PromoConn struct {
	RedisConn *redis.Conn
	Pools map[string]*Pool
}

// WsPromos creates a connection to any valid endpoints
// matching the sat route prefix of /sockets/promos/:id
func (pc *PromoConn) wsPromos(c *gin.Context)  {

	// establish a new client connection
	conn, err := createConnection(c)
	if err != nil {
		log.Println("Unable to establish connection...")
		return
	}

	// get current socket id from req context
	promoID := fmt.Sprintf("promos/%s", c.Param("id"))

	// check if current promo pool is currently active,
	// if so, add the active pool to the client,
	// if not, initialize a new pool, start and add to list of pools
	pool, isPresent := pc.Pools[promoID]
	if !isPresent {
		fmt.Println("New pool detected, adding to map of pools...")
		pool = NewPool()
		go pool.Start()
		pc.Pools[promoID] = pool
	}

	// create a new client with a socket connection
	// and a referene to the promo pool
	client := &Client {
		Conn: conn,
		Pool: pool,
	}

	log.Println("Pool: ", pc.Pools)
	log.Println("Client connected...")

	// register new client to pool and start to 
	// listen for incoming messages by read
	pool.Register <- client
	client.Read()

	/*// get current socket id from req context
	promoID := fmt.Sprintf("promos/%s", c.Param("id"))

	// new client connected, retrieve and update redis cache with added value
	numCons, err := r.Get(pc.RedisConn, promoID, "int")
	if err != nil && err == redis.ErrNil {

		// no value stored with the promo id, set initial value
		err := r.Set(pc.RedisConn, promoID, 1)
		if err != nil {
			return
		}

		numCons = 1
	}

	// send back the number of connections to current promo, back to client
	n := numCons.(int) + 1 // +1 for newly connected user
	if err = ws.WriteMessage(1, p.IntToStrBytes(n)); err != nil { return }
	if err = r.Set(pc.RedisConn, promoID, n); err != nil { return }

	// listen indefinitely for new messages coming
    // through on our WebSocket connection
	//go promoReader(ws, pc.RedisConn, n, promoID)
	//promoWriter(ws)*/
}

// define a reader which will listen for
// new messages being sent to our WebSocket
// endpoint
/*func promoReader(wsConn *websocket.Conn, redisConn *redis.Conn, numCons int, promoID string) {
	for {

		// handle messages to be recieved from client
		messageType, p, err := wsConn.ReadMessage()

		// handles errors for read
		if err != nil {

			// users disconnected, connection went lost
			// update redis cache to reflect new number of cons
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {

				// if number of connections is 0, remove entry set
				if numCons - 1 == 0 {
					r.Delete(redisConn, promoID)
				} else {
					r.Set(redisConn, promoID, numCons - 1)
				}
			}

			log.Printf("error: %v", err)
			return
		}

		// log recieved message
		log.Println(string(p))

		if err := wsConn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}

	}
}*/