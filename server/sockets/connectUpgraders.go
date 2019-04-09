package sockets

import (
	"net/http"
	"log"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader {
	ReadBufferSize: 1024,
	WriteBufferSize: 1024,
}

// ConnectUpgraders connects all upgrades endpoints
func ConnectUpgraders(router *gin.Engine) {
	sockets := router.Group("/sockets")
	{
		sockets.GET("/promos/:id", WsPromos)
	}
}

// CreateConnection establishes and upgrades the current HTTP connection
// to a new websocket connection that allows for sending/recieving of messages
func CreateConnection(c *gin.Context) (*websocket.Conn, error) {

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