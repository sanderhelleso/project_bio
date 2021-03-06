import React, { Fragment } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../styles/Keyframes';
import ReactTooltip from 'react-tooltip';

const SelectProductOption = ({ product, active }) => {
	return (
		<Fragment>
			<StyledOption data-tip={product.name} data-for={product.name} active={active}>
				<img src={`http://localhost:5000/${product.image}`} onError={(e) => (e.target.src = product.image)} />
			</StyledOption>
			<ReactTooltip id={product.name} place="right" type="dark" effect="solid" />
		</Fragment>
	);
};

export default SelectProductOption;

const StyledOption = styled.div`
	background-color: ${(props) => props.theme.secondaryColor};
	border-radius: 50%;
	cursor: pointer;
	transition: 0.3s ease-in-out;
	margin: 0 auto;
	min-height: 5rem;
	max-width: 5rem;
	min-width: 5rem;
	max-height: 5rem;
	overflow: hidden;
	border: 2px solid ${(props) => (props.active ? props.theme.secondaryColor : '#eeeeee')};
	animation: ${fadeIn} 0.5s ease-in-out;
	img {
		width: 100%;
		height: 100%;
		min-height: 4.8rem;
		object-fit: cover;
	}

	@media screen and (max-width: 600px) {
		min-height: 4.5rem;
		max-width: 4.5rem;
		min-width: 4.5rem;
		max-height: 4.5rem;
	}
`;
