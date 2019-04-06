import React, { Fragment } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../styles/Keyframes';
import ReactTooltip from 'react-tooltip';

const SelectProductOption = ({ product, active }) => {
	return (
		<Fragment>
			<StyledOption data-tip={product.name} data-for={product.name} active={active}>
				<img src={`http://localhost:5000/${product.image}`} />
			</StyledOption>
			<ReactTooltip id={product.name} place="right" type="dark" effect="solid" />
		</Fragment>
	);
};

export default SelectProductOption;

const StyledOption = styled.div`
	border-radius: 50%;
	margin: 2rem auto;
	cursor: pointer;
	transition: 0.3s ease-in-out;
	min-height: 5rem;
	max-width: 5rem;
	min-width: 5rem;
	max-height: 5rem;
	overflow: hidden;
	border: 2px solid ${(props) => (props.active ? props.theme.secondaryColor : '#eeeeee')};
	${fadeIn};

	img {
		max-height: 5rem;
		max-width: 5rem;
		border-radius: 50%;
	}
`;
