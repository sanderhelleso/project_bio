import { isValidDate } from "./date";

// validate form represented by an objects fields
export function validateFormByObj(p) {
    const errors = Object.entries(p)
    .map(([field, value]) => setErrMsg(field, value))
    .filter(p => p);

    // return true if no errors or a list of errors
    return errors.length === 0 || errors;
};

function setErrMsg(field, value) {

    // handle empty defaults
    if (!value) return setEmpyErrMsg(field);

    // handle errors releated to promo code
    if (field === 'promotion_code' || field === 'discount_amount' || field === 'expires_at') {
        return setCodeErrMsg(field, value);
    }

    // set message depending on field
    let error = '';
    switch(field) {
        case 'title':
            if (!isBetween(value.length, 2, 70)) 
                error = `${field} must be between 2 and 70 characters`;
            break;
        case 'description':
            if (!isBetween(value.length, 20, 500)) 
                error = `${field} must be between 20 and 500 characters`;
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

function setCodeErrMsg(field, value) {
    console.log(field);
    switch(field) {
        case 'promotion_code':
            if (value.length > 255) 
                return `${field} cant be longer than 255 characters`;
            break;
        case 'discount_amount':
            console.log(123);
            if (value.length > 3 || !isBetween(parseInt(value), 1, 100)) 
                return `${field} must be between 1 - 100%`;
            break;
        case 'expires_at':
            // TODO: replace with date validation
            //if (!isValidDate(value))
                //return `${field} is not in a valid date format. (mm/dd/yyyy)`;
            break;
        default: 
            return `Please fill out ${field}`;
    }
}

function isBetween(n, min, max) {
    return n >= min && n <= max;
}