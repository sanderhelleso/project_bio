package sockets

import (
	"net/http"
	"log"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/gomodule/redigo/redis"
)

var upgrader = websocket.Upgrader {
	ReadBufferSize: 1024,
	WriteBufferSize: 1024,
}

type client struct {
	conn *redis.Conn
	hub  *map[*client]bool
}

// ConnectUpgraders connects all upgraded endpoints
func ConnectUpgraders(router *gin.Engine, conn *redis.Conn) {

	// create a new socket client with connection to redis cache
	pc := &client { conn, nil }

	// init a new hub and add the new client
	h := make(map[*client]bool)
	h[pc] = true
	pc.hub = &h

	sockets := router.Group("/sockets")
	{
		sockets.GET("/promos/:id", pc.wsPromos)
	}
}

// CreateConnection establishes and upgrades the current HTTP connection
// to a new websocket connection that allows for sending/recieving of messages
func createConnection(c *gin.Context) (*websocket.Conn, error) {

	// required for no CORS
	upgrader.CheckOrigin = func(r *http.Request) bool {
		return true
	}

	// upgrade this connection to a WebSocket connection
	ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	return ws, nil;
}
