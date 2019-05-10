import React from 'react';
import styled from 'styled-components';
import FavoritePromo from './FavoritePromo';
import SharePromo from './SharePromo';
import CurrentlyWatching from './CurrentlyWatching';

const ToolCont = () => (
	<StyledCont>
		<FavoritePromo />
		<SharePromo />
		<CurrentlyWatching />
	</StyledCont>
);

export default ToolCont;

const StyledCont = styled.div`
	position: absolute;
	left: 2rem;
	top: 2rem;
	z-index: 99;

	@media screen and (max-width: 1100px) {
		right: 2rem;
		left: auto;
	}
`;
