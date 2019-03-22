package email

import (
	"github.com/arxdsilva/hermes" // uses branch that fixes go module problem
)

const (
	welcomeSubject = "Welcome to projectbio!"
	resetSubject   = "Instructions for resseting your password."
	resetBaseURL   = "http://localhost:5000/reset"
)

// Welcome creates a new welcome email with a verification
// link that allows user to verify their account
func Welcome(link string) hermes.Email {
	return hermes.Email{
		Body: hermes.Body{
			Name: "Hi There!",
			Intros: []string{
				"Welcome to Project Bio! We're very excited to have you on board.",
			},
			Actions: []hermes.Action{
				{
					Instructions: "To get started we need you to verify your account, please click here:",
					Button: hermes.Button{
						Color: "#22BC66", // Optional action button color
						Text:  "Confirm your account",
						Link:  link,
					},
				},
			},
			Outros: []string{
				"Need help, or have questions? Just reply to this email, we'd love to help.",
			},
		},
	}
}

const (
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

// GenerateEmail generates a hermes styled email
func GenerateEmail(email hermes.Email) (string, string) {

	h := hermes.Hermes{
		Product: hermes.Product{
	
			// Appears in header & footer of e-mails
			Name: "Project Bio",
			Link: "https://google.com/",
				
			// Optional product logo
			Logo: "http://www.duchess-france.org/wp-content/uploads/2016/01/gopher.png",
		},
	}

	// Generate an HTML email with the provided contents (for modern clients)
	emailBody, _ := h.GenerateHTML(email)

	// Generate the plaintext version of the e-mail (for clients that do not support xHTML)
	emailText, _ := h.GeneratePlainText(email)

	return emailText, emailBody
}