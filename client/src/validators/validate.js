
// validate form represented by an objects fields
// releated to the passed inn error handling functions
export function validateFormByObj(obj, errHandler) {
    
    const errors = Object.entries(obj)
    .map(([field, value]) => errHandler(field, value))
    .filter(v => v);

    // return true if no errors or a list of errors
    return errors.length === 0 || errors;
};