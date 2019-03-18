package lib

// Must will panic if ANY error is present
// used on critical operations that must pass
// in order for application to function
func Must(err error) {
	if err != nil {
		panic(err)
	}
}