package email

import (
	"github.com/arxdsilva/hermes" // uses branch that fixes go module problem
)

const (
	welcomeSubject = "Welcome to Project Bio!"
	resetSubject   = "Instructions for resseting your password."
	resetBaseURL   = "http://localhost:5000/users/reset"
	verifyBaseURL  = "http://localhost:5000/users/verify"
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

// Welcome generates a new welcome email body with a verification
// link that allows user to verify their account
func Welcome(link string) hermes.Email {
	return hermes.Email{
		Body: hermes.Body{
			Intros: []string{
				"Welcome to Project Bio! We're very excited to have you on board.",
			},
			Actions: []hermes.Action{
				{
					Instructions: "To get started we need you please confirm your account.",
					Button: hermes.Button{
						Color: "#22BC66", 
						TextColor: "#FFFFFF",
						Text:  "Confirm your account",
						Link:  link,
					},
				},
			},
			Outros: []string{
				"Need help, or have questions? Just reply to this email, we'd love to help.",
			},
			Signature: "Thanks",
		},
	}
}

// Reset generates  a new reset email body with a verification
// link that allows user to reset their accounts password
func Reset(link string) hermes.Email {
	return hermes.Email{
		Body: hermes.Body{
			Intros: []string{
				"You have received this email because a password reset request for Project Bio account was received.",
			},
			Actions: []hermes.Action{
				{
					Instructions: "Click the button below to reset your password:",
					Button: hermes.Button{
						Color: "#DC4D2F",
						TextColor: "#FFFFFF",
						Text:  "Reset your password",
						Link:  link,
					},
				},
			},
			Outros: []string{
				"If you did't request a password reset you can safely ignore this email and your account will not be changed",
			},
			Signature: "Thanks",
		},
	}
}
