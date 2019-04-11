package sockets

import (
	"fmt"
	"../lib/parser"
)

// Pool represents a connection pool
// with required methods for a 
// realtime socket connection
type Pool struct {
	Register 	chan *Client
	Unregister 	chan *Client
	Clients 	map[*Client]bool
	Broadcast 	chan Message
}

// NewPool initializes a new pool of channels
func NewPool() *Pool {
	return &Pool {
		Register: 	make(chan *Client),
		Unregister: make(chan *Client),
		Clients: 	make(map[*Client]bool),
		Broadcast:	make(chan Message),
	}
}

// Start starts a new pool, handling connect, disconnect and broadcasting
func (pool *Pool) Start(pools *map[string]*Pool, id string) {
	for {
		select {

		// new client connected to pool
		case client := <- pool.Register:
			pool.Clients[client] = true
			fmt.Println("CONNECT - Size of connection pool: ", len(pool.Clients))

			for client := range pool.Clients {
				client.Conn.WriteJSON(Message{ 1, parser.IntToStr(len(pool.Clients)) })
			}
			break

		// existing client disconnected from pool
		case client := <- pool.Unregister:
			delete(pool.Clients, client)
			fmt.Println("DISCONNECT - Size of connection pool: ", len(pool.Clients))

			activeClients := len(pool.Clients)
			for client := range pool.Clients {
				client.Conn.WriteJSON(Message{ 1, parser.IntToStr(activeClients) })
			}

			// if no connections in pool is left, remove from map of pools
			if activeClients == 0 {
				delete(*pools, id)
				return
			}

			break
		case message := <- pool.Broadcast:
			fmt.Println("Sending message clients in pool...")
			for client := range pool.Clients {
				if err := client.Conn.WriteJSON(message); err != nil {
					fmt.Println(err)
					return
				}
			}
		}		
	}
}