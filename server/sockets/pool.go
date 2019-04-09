package sockets

import "fmt"

type Pool struct {
	Register 	chan *Client
	Unregister 	chan *Client
	Clients 	map[*Client]bool
	Broadcast 	chan Message
}

func NewPool() *Pool {
	return &Pool {
		Register: 	make(chan *Client),
		Unregister: make(chan *Client),
		Clients: 	make(map[*Client]bool),
		Broadcast:	make(chan Message),
	}
}

func (pool *Pool) Start() {
	for {
		select {

		// new client connected to pool
		case client := <- pool.Register:
			pool.Clients[client] = true
			fmt.Println("Size of connection pool: ", len(pool.Clients))

			for client := range pool.Clients {
				fmt.Println(client)
				client.WsConn.WriteJSON(Message{ 1, "New user connected..." })
			}
			break

		// existing client disconnected from pool
		case cllient := <- pool.Unregister:
			delete(pool.Clients, cllient)
			fmt.Println("Size of connection pool: ", len(pool.Clients))
			for client := range pool.Clients {
				client.WsConn.WriteJSON(Message{ 1, "User disconnected..."})
			}
			break
		case message := <- pool.Broadcast:
			fmt.Println("Sending message clients in pool...")
			for client := range pool.Clients {
				if err := client.WsConn.WriteJSON(message); err != nil {
					fmt.Println(err)
					return
				}
			}
		}		
	}
}