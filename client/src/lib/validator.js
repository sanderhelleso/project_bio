
// validate form represented by objects field
export function validateFormByObj(p) {
    const errors = Object.entries(p)
    .map(([field, value]) => setErrMsg(field, value))
    .filter(p => p);

    // return true if no errors or list of error objs
    return errors.length === 0 || errors;
};

function setErrMsg(field, value) {

    // handle empty defaults
    if (!value) return setEmpyErrMsg(field);

    // set message depending on field
    let error = '';
    switch(field) {
        case 'title':
            if (value.length < 2 || value.length > 70) 
                error = `${field} must be between 2 and 70 characters`;
            break;
        case 'description':
            if (value.length < 20 || value.length > 500) 
                error = `${field} must be between 20 and 500 characters`;
            break;
        case 'promotion_code':
            if (value.length < 1 || value.length > 255) 
                error = `${field} must be between 1 and 255 characters`;
            break;
        case 'image':
            error = `Please upload an image`; 
            break;
        default: 
            error = '';
    }

    return error;
}

function setEmpyErrMsg(field) {
    switch(field) {
        case 'category':
            return `Please select a ${field}`
        default: 
            return `Please fill out ${field}`;
    }
}