package email

import (
	mailgun "gopkg.in/mailgun/mailgun-go.v1"
	"fmt"
	"os"
	"net/url"
)

const (
	welcomeSubject = "Welcome to projectbio!"
	resetSubject   = "Instructions for resseting your password."
	resetBaseURL   = "http://localhost:5000/reset"

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

	resetTextTmpl = `Hi there!

	It appears that you have requested a password reset. If this was you, 
	please follow the link below to update your password:

	%s

	If you are asked for a token, please use the following value:

	%s

	If you did't request a password reset you ca safely ignore this email
	and your account will not be changed

	Best,
	Team Bio
	`

	resetHTMLTmpl = `Hi there!
	<br><br>
	<p>It appears that you have requested a password reset. If this was you, 
	please follow the link below to update your password:</P>
	<br><br>
	<a href="%s">%s</a>
	<br><br>
	<p>If you are asked for a token, please use the following value:</p>
	<br><br>
	<strong>%s</strong>
	<br><br>
	<p>If you did't request a password reset you ca safely ignore this email
	and your account will not be changed</p>
	<br><br>
	Best,
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

func (c *Client) Welcome(toName, toEmail string) error {
	message := mailgun.NewMessage(c.from, 
	welcomeSubject, 
	welcomeText,
	buildEmail(toName, toEmail))

	message.SetHtml(welcomeHTML)

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