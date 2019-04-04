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
	"../lib/rand"
)

type ImageService interface {
	CreateAvatar(profile *Profile, f *multipart.FileHeader) (string, error)
	CreatePromoProduct(promoProduct *PromoProduct, f *multipart.FileHeader) error
}

func NewImageService() ImageService {
	return &imageService {}
}

type imageService struct {}

// CreateAvatar takes in a pointer to a profile and fileheader and will
// attempt to create a new avatar with the provided file from the user
func (is *imageService) CreateAvatar(profile *Profile, f *multipart.FileHeader) (string, error) {
	err := validateExt(f.Filename)
	if err != nil {
		return "", err
	}

	path, err := mkImagePath("avatars", profile.UserID)
	if err != nil {
		return "", err
	}

	file, err := f.Open()
	if err != nil {
		return "", err
	}

	// generate random name
	name, err := rand.RandomToken()
	if err != nil {
		return "", err
	}

	// save image at path
	path += fmt.Sprintf(name + ".jpg")
	err = saveImage(path, file, 250, 250)
	if err != nil {
		return "", err
	}

	profile.Avatar = path
	return path, nil
}

// CreatePromo takes in a pointer to a promo and fileheader and will
// attempt to create a new promo with the provided file from the promo
func (is *imageService) CreatePromoProduct(promoProduct *PromoProduct, f *multipart.FileHeader) error {
	err := validateExt(f.Filename)
	if err != nil {
		return err
	}

	path, err := mkImagePath("promos", promoProduct.ID)
	if err != nil {
		return err
	}

	file, err := f.Open()
	if err != nil {
		return err
	}

	// generate random name
	name, err := rand.RandomToken()
	if err != nil {
		return err
	}

	// save image at path
	path += fmt.Sprintf(name + ".jpg")
	err = saveImage(path, file, 300, 300)
	if err != nil {
		return err
	}

	promoProduct.Image = path
	return nil
}

func mkImagePath(service string, id uint) (string, error) {
	path := fmt.Sprintf("images/%v/%v/", service, id)
	err := os.MkdirAll(path, 0755)
	if err != nil {
		return "", err
	}

	return path, nil
}

// saveImage takes in a path and file and saves the data of the file
// to the destination path that is passed in
func saveImage(path string, file multipart.File, width, height uint) error {
	dst, err := os.Create(path)
	if err != nil {
		return err
	}
	defer dst.Close()

	// rezise file
	new, err := resizeImg(width, height, file)
	if err != nil {
		return err
	}
	
	// store avatar in users path
	err = jpeg.Encode(dst, new, nil)
	if err != nil {
		return err
	}

	return nil
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