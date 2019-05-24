import React from 'react';
import styled from 'styled-components';

import { load } from '../../styles/Keyframes';

const PromosLoader = () => {
	return (
		<StyledLoader>
			<div />
			<div />
			<div />
		</StyledLoader>
	);
};

export default PromosLoader;

const StyledLoader = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	grid-row-gap: 4rem;
	grid-column-gap: 3rem;
	margin-top: 4rem;

	@media screen and (max-width: 1000px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media screen and (max-width: 600px) {
		grid-template-columns: minmax(0, 1fr);
	}

	div {
		min-height: 450px;
		background-color: #e0e0e0;
		border-radius: 4px;
		animation: ${load} 2s infinite;
	}
`;
