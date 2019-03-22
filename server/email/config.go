package email

import (
	mailgun "gopkg.in/mailgun/mailgun-go.v1"
	"os"
)

// WithMailgun implements the mailgun api that allows us to
// use the mailgun service to send emails to verified emails
func WithMailgun(domain, apiKey, pubKey string) ClientConfig {
	return func(c *Client) {
		mg := mailgun.NewMailgun(domain, apiKey, pubKey)
		c.mg = mg
	}
}

// WithSender creates the emails from recipient
func WithSender(name, email string) ClientConfig {
	return func(c *Client) {
		c.from = buildEmail(name, email)
	}
}

// ClientConfig is the config type for the client
type ClientConfig func(*Client)

// NewClient instantiates a new mail client
func NewClient(opts ...ClientConfig) *Client {
	client := Client {
		from: os.Getenv("MAIL_DEFAULT_EMAIL"),
	}

	for _, opt := range opts {
		opt(&client)
	}

	return &client
}

// Client represents an email client in the application
type Client struct {
	from 	string
	mg 		mailgun.Mailgun
}