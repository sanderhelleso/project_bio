

export function validateProduct(p) {
    const errors = Object.entries(p).map(([field, value]) => {
        if (!value) {
            return {
                error: `Please fill out ${field}`,
                field
            }
        }
    }).filter(p => p);

    return errors.length === 0 || errors;
};