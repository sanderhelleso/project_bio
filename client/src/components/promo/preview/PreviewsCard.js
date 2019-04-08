import React from 'react';
import styled from 'styled-components';
import { PreviewsCardSingle } from '../../styles/Card';
import Preview from './Preview';

const PreviewsCard = () => (
	<PreviewsCardSingle>
		<StyledHeader>
			<h2>Similar promotions</h2>
		</StyledHeader>
		<StyledCont>
			<Preview />
			<Preview />
			<Preview />
			<Preview />
			<Preview />
		</StyledCont>
	</PreviewsCardSingle>
);

export default PreviewsCard;

const StyledHeader = styled.div`
	margin-bottom: 4rem;
	h2 {
		font-weight: 100;
		color: #9e9e9e;
	}
`;

const StyledCont = styled.div`
	display: grid;
	min-height: 100%;
	position: relative;
`;
