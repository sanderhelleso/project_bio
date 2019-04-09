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
		go pool.Start(&pc.Pools, promoID)
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
}