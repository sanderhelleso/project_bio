package models

import (
	"image"
	"image/jpeg"
	_ "image/png"
	"fmt"
	"os"
	"mime/multipart"
	"github.com/nfnt/resize"
	"path/filepath"
	"strings"
	"errors"
)

type ImageService interface {
	CreateAvatar(profile *Profile, f *multipart.FileHeader) error
}

func NewImageService() ImageService {
	return &imageService {}
}

type imageService struct {}

// CreateAvatar takes in a pointer to a profile and fileheader and will
// attempt to create a new avatar with the provided file from the user
func (is *imageService) CreateAvatar(profile *Profile, f *multipart.FileHeader) error {
	err := validateExt(f.Filename)
	if err != nil {
		return err
	}

	path, err := mkAvatarPath(profile.UserID)
	if err != nil {
		return err
	}

	path += "avatar.jpg"
	file, err := f.Open()
	if err != nil {
		return err
	}
	defer file.Close()

	// create destination file
	dst, err := os.Create(path)
	if err != nil {
		return err
	}
	defer dst.Close()

	// rezise file
	new, err := resizeImg(150, 150, file)
	if err != nil {
		return err
	}
	
	// store avatar in users path
	err = jpeg.Encode(dst, new, nil)
	if err != nil {
		return err
	}

	// set avatar for profile
	profile.Avatar = path
	return nil
}

func mkAvatarPath(userID uint) (string, error) {
	avatarPath := fmt.Sprintf("images/avatars/%v/", userID)
	err := os.MkdirAll(avatarPath, 0755)
	if err != nil {
		return "", err
	}

	return avatarPath, nil
}

// resizeImg will resize a image file to the passed inn demensions
// using Lanczos resampling and preserve aspect ratio
func resizeImg(width, height uint, file multipart.File) (image.Image, error) {
	img, _, err := image.Decode(file)
	defer file.Close()

	if err != nil {
		return nil, err
	}

	new := resize.Resize(width, height, img, resize.Lanczos3)
	return new, nil
}

// validateExt validates an image extension
// and returns an error if its not PNG or JPG
func validateExt(path string) error {
	ext := strings.ToLower((filepath.Ext(path)))

	// check ext
	if !(ext == ".jpg" || ext == ".png") {
		return errors.New("only files of type JPG or PNG are allowed")
	}

	return nil
}