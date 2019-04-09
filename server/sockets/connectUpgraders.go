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
	CheckOrigin: func(r *http.Request) bool { return true },
}

// CreateConnection establishes and upgrades the current HTTP connection
// to a new websocket connection that allows for sending/recieving of messages
func createConnection(c *gin.Context) (*websocket.Conn, error) {

	// upgrade this connection to a WebSocket connection
	ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	return ws, nil;
}

// ConnectUpgraders connects all upgraded endpoints
func ConnectUpgraders(router *gin.Engine, redisConn *redis.Conn) {

	// setup all connection pools
	promoPools := make(map[string]*Pool)
	pc := &PromoConn{ redisConn, promoPools }

	// serve pools on endpoint hit
	sockets := router.Group("/sockets")
	{
		sockets.GET("/promos/:id", pc.wsPromos)
	}
}