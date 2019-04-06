import React, { useReducer } from 'react';
import { PromoCardSingle } from '../../styles/Card';
import PromoImg from './PromoImg';
import PromoInfo from './PromoInfo';
import SelectProductList from './SelectProductList';

const PromoCard = ({ promo, products, profile: { handle, avatar } }) => {
	const [ state, updateState ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		active: products[0]
	});

	const { active } = state;

	return (
		<PromoCardSingle>
			<PromoImg image={active.image} />
			<PromoInfo {...promo} profile={{ handle, avatar }} />
			<SelectProductList products={products} active={active} updateState={updateState} />
		</PromoCardSingle>
	);
};

export default PromoCard;
