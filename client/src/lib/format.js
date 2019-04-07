// capitalize given string
export function capitalize(str) {
	return `${str.charAt(0).toUpperCase()}${str.substr(1).toLowerCase()}`;
}

// convert a timestamp to date
export function tsToDate(timestamp) {
	return new Date(timestamp).toDateString();
}

// get ts from a date string
export function dateStringToTs(time) {
	const now = new Date();
	const dateString = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${time}`;
	return new Date(dateString).getTime();
}

// convert a timestamp to HH:MM
export function tsToHHMM(timestamp) {
	const date = new Date(timestamp);
	return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
}

export function getFormatedDateAndTime(timestamp) {
	return `${tsToDate(timestamp)} ${tsToHHMM(timestamp)}`;
}

// remove key from object
export function removeByKey(obj, deleteKey) {
	return Object.keys(obj).filter((key) => key !== deleteKey).reduce((result, current) => {
		result[current] = obj[current];
		return result;
	}, {});
}

// get percentage of two nums
export function getPercentage(num1, num2) {
	return Math.round(num1 / num2 * 100);
}

// get percent of total value
export function getPercentageOfTotal(num1, num2) {
	return Math.round(num1 / 100 * num2);
}
