export default (field, value) => {
	// handle empty defaults
	if (!value) return setEmpyErrMsg(field);

	// handle erros releated to promo info
	if (field === 'title' || field === 'description') return setPromoInfoErrMsg(field, value);

	// handle errors releated to promo code
	if (field === 'code' || field === 'amount' || field === 'expires') return setCodeErrMsg(field, value);
};

function setEmpyErrMsg(field) {
	switch (field) {
		case 'category':
			return `Please select a ${field}`;

		default:
			return `Please fill out ${field}`;
	}
}

function setPromoInfoErrMsg(field, value) {
	switch (field) {
		case 'title':
			if (!isBetween(value.length, 2, 70)) {
				return `${field} must be between 2 and 70 characters`;
			}
			break;

		case 'description':
			if (!isBetween(value.length, 20, 500)) {
				return `${field} must be between 20 and 500 characters`;
			}
			break;

		default:
			return '';
	}
}

function setCodeErrMsg(field, value) {
	switch (field) {
		case 'code':
			if (value.length > 255) {
				return `${field} cant be longer than 255 characters`;
			}
			break;

		case 'discount':
			if (value.length > 3 || !isBetween(parseInt(value), 1, 100)) {
				return `${field} must be between 1 - 100%`;
			}
			break;

		case 'expires':
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
