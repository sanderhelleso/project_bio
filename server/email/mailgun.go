package email

import (
	mailgun "gopkg.in/mailgun/mailgun-go.v1"
	"fmt"
	"os"
	"net/url"
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
		from: os.Getenv("MAIL_DEFAULT_EMAIL"),
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

func (c *Client) Welcome(toEmail string) error {

	verifyURL := "https://google.com"

	template := Welcome(verifyURL)
	text, html := GenerateEmail(template)

	message := mailgun.NewMessage(c.from, 
	welcomeSubject, 
	text,
	buildEmail("", toEmail))

	message.SetHtml(html)

	_, _, err := c.mg.Send(message)
	return err
}

func (c *Client) ResetPw(toEmail, token string) error {

	// TODO: Build the reset url
	v := url.Values{}
	v.Set("token", token)
	resetURL := resetBaseURL + "?" + v.Encode()
	resetText := fmt.Sprintf(resetTextTmpl, resetURL, token)

	message := mailgun.NewMessage(c.from, 
	resetSubject, 
	resetText,
	toEmail)

	resetHTML := fmt.Sprintf(resetHTMLTmpl, resetURL, resetURL, token)
	message.SetHtml(resetHTML)

	_, _, err := c.mg.Send(message)
	return err
}

func buildEmail(name, email string) string {
	if name == "" {
		return email
	}

	return fmt.Sprintf("%s <%s>", name, email)
}