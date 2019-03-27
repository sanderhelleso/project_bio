
export function objKeysToLower(obj) {
    return Object.keys(obj)
    .reduce((destination, key) => {
        const lcKey = key.charAt(0).toLowerCase() + key.slice(1); 
        destination[lcKey] = obj[key];
        return destination;
    }, {});
}