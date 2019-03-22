package email

import (
	"fmt"
	"net/url"
)

// Welcome sends a welcome email to a newly signed up user,
// includes a generated verification link that
// the user must confirm in order to verify the account
func (c *Client) Welcome(toEmail string) error {

	// TODO: Generate verification link
	verifyURL := "https://google.com"

	template := Welcome(verifyURL)
	text, html := GenerateEmail(template)

	message := c.mg.NewMessage(c.from, 
		welcomeSubject, 
		text,
		buildEmail("", toEmail),
	)

	message.SetHtml(html)

	_, _, err := c.mg.Send(message)
	return err
}

// ResetPw sends a reset password email to the recipient
// that requested the reset using their email address,
// includes a generated reset password link that the
// user must use in order to be able to reset their password
func (c *Client) ResetPw(toEmail, token string) error {

	// TODO: Build the reset url
	v := url.Values{}
	v.Set("token", token)
	resetURL := resetBaseURL + "?" + v.Encode()

	template := Reset(resetURL)
	text, html := GenerateEmail(template)

	message := c.mg.NewMessage(c.from, 
		resetSubject, 
		text,
		toEmail,
	)

	message.SetHtml(html)

	_, _, err := c.mg.Send(message)
	return err
}

// buildEmail builds the emails to name
func buildEmail(name, email string) string {
	if name == "" {
		return email
	}

	return fmt.Sprintf("%s <%s>", name, email)
}