import React from 'react';

const PromosList = ({ list }) => {
	return Object.entries(list).map(([ id, promo ]) => {
		return <li key={id}>{promo.title}</li>;
	});
};

export default PromosList;
