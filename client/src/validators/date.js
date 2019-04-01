// validates that the input string is a valid date formatted as "mm/dd/yyyy"
export function isValidDate(dateString) {

    // check date pattern
    const dateRxg = new RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
    if(!dateRxg.test(dateString)) {
        return false;
    }

    // parse the date parts to integers
    const parts = dateString.split('/').map(p => parseInt(p, 10));
    const month = parts[0]; 
    const day   = parts[1];
    const year  = parts[2];

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12) {
        return false;
    }

    const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // adjust for leap years
    if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};