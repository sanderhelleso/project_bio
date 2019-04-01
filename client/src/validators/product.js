

export default (field, value) => {

    // handle empty defaults
    if (!value) return setEmpyErrMsg(field);

    return '';
}

function setEmpyErrMsg(field) {
    switch(field) {
        default: 
            return `Please fill out ${field}`;
    }
}

function setProductErrMsg(field, value) {
    switch(field) {
        
        default: 
            return '';
    }
}