import React, { useReducer } from 'react';
import { PromoCardSingle } from '../../styles/Card';
import PromoImg from './PromoImg';
import PromoInfo from './PromoInfo';
import SelectProductList from './SelectProductList';
import ToolCont from './ToolCont';

import { connect } from 'react-redux';

const PromoCard = ({ products }) => {
	const [ state, updateState ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		active: {
			id: 0,
			...products[0]
		}
	});

	const { active } = state;

	const listProps = {
		active,
		products,
		updateState
	};

	return (
		<PromoCardSingle>
			<ToolCont />
			<PromoImg image={active.image} />
			<PromoInfo active={active} />
			<SelectProductList {...listProps} />
		</PromoCardSingle>
	);
};

const mapStateToProps = ({ promos: { viewing: { products } } }) => {
	return { products };
};

export default connect(mapStateToProps, null)(PromoCard);
