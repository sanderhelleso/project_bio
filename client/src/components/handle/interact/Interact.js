import React from 'react';
import styled from 'styled-components';

import Followers from './Followers';
import Following from './Following';

const Interact = () => {
	return (
		<StyledInteractCont>
			<Followers />
			<Following />
		</StyledInteractCont>
	);
};

export default Interact;

const StyledInteractCont = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
	grid-row-gap: 1rem;
	grid-column-gap: 1rem;

	/* prettier-ignore */
	grid-template-areas:
		"followers following"
	;
`;
