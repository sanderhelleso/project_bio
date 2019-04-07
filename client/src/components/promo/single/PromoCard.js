import React, { useReducer } from 'react';
import { PromoCardSingle } from '../../styles/Card';
import PromoImg from './PromoImg';
import PromoInfo from './PromoInfo';
import SelectProductList from './SelectProductList';

import { connect } from 'react-redux';

const PromoCard = ({ products }) => {
	const [ state, updateState ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		active: {
			id: 0,
			...products[0]
		}
	});

	const { active } = state;

	return (
		<PromoCardSingle>
			<PromoImg image={active.image} />
			<PromoInfo active={active} />
			<SelectProductList products={products} active={active} updateState={updateState} />
		</PromoCardSingle>
	);
};

const mapStateToProps = ({ promos: { viewing: { products } } }) => {
	return { products };
};

export default connect(mapStateToProps, null)(PromoCard);
