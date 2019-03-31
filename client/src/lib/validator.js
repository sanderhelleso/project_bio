
// validate form represented by objects field
export function validateFormByObj(p) {
    const errors = Object.entries(p)
    .map(([field, value]) => {
        if (!value) {
            let error = `Please fill out ${field}`;
            if (field === 'image') { 
                error = `Please upload an image`; 
            }

            return { error, field }
        }
    }).filter(p => p);

    // return true if no errors or list of error objs
    return errors.length === 0 || errors;
};