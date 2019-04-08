import React from 'react';
import styled from 'styled-components';
import FavoritePromo from './FavoritePromo';
import SharePromo from './SharePromo';

const ToolCont = () => (
	<StyledCont>
		<FavoritePromo />
		<SharePromo />
	</StyledCont>
);

export default ToolCont;

const StyledCont = styled.div`
	position: absolute;
	left: 2rem;
	top: 2rem;

	@media screen and (max-width: 1100px) {
		right: 2rem;
		left: auto;
	}
`;
