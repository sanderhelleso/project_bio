package email

import (
	mailgun "gopkg.in/mailgun/mailgun-go.v1"
	"fmt"
	"os"
)

const (
	welcomeSubject = "Welcome to projectbio!"

	welcomeText = `Hi there!

	Welcome to projectbio! We really home you enjoy using
	our application!

	Best,
	Team Bio
	`
	welcomeHTML = `<h4>Hi there!</h4>
	<br><br>
	<p>Welcome to <a href="https://www.google.com">Projectbio.com</a>!</p>
	<br><br>
	<p>We really hope you enjoy using our application!</p>
	<br>
	Best,
	<br>
	Team Bio
	`
)

func WithMailgun(domain, apiKey, pubKey string) ClientConfig {
	return func(c *Client) {
		mg := mailgun.NewMailgun(domain, apiKey, pubKey)
		c.mg = mg
	}
}

func WithSender(name, email string) ClientConfig {
	return func(c *Client) {
		c.from = buildEmail(name, email)
	}
}

type ClientConfig func(*Client)

func NewClient(opts ...ClientConfig) *Client {
	client := Client {
		from: os.Getenv("MAIL_DEFAULT_FROM"),
	}

	for _, opt := range opts {
		opt(&client)
	}

	return &client
}

type Client struct {
	from 	string
	mg 		mailgun.Mailgun
}

func (c *Client) Welcome(toName, toEmail string) error {

	// build
	message := mailgun.NewMessage(
	c.from, 
	welcomeSubject, 
	welcomeText,
	buildEmail(toName, toEmail))
	
	// set html
	message.SetHtml(welcomeHTML)

	// send
	_, _, err := c.mg.Send(message)
	return err
}

func buildEmail(name, email string) string {
	if name == "" {
		return email
	}

	return fmt.Sprintf("%s <%s>", name, email)
}