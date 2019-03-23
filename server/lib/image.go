package lib

import (
	"github.com/nfnt/resize"
	"image"
	_ "image/png"
	"mime/multipart"
	"path/filepath"
	"strings"
	"errors"
)


// ResizeImg will resize a image file to the passed inn demensions
// using Lanczos resampling and preserve aspect ratio
func ResizeImg(width uint, height uint, file multipart.File) (image.Image, error) {
	img, _, err := image.Decode(file)
	defer file.Close()

	if err != nil {
		return nil, err
	}

	new := resize.Resize(height, width, img, resize.Lanczos3)
	return new, nil
}

// ValidateExtension validates an image extension
// and returns an error if its not PNG or JPG
func ValidateExtension(path string) error {
	ext := strings.ToLower((filepath.Ext(path)))

	// check ext
	if !(ext == ".jpg" || ext == ".png") {
		return errors.New("only files of type JPG or PNG are allowed")
	}

	return nil
}