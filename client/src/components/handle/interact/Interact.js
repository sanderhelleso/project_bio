import React from 'react';
import styled from 'styled-components';

import Follow from './Follow';
import Connect from './Connect';

const Interact = () => {
	return (
		<div>
			<StyledInteractCont>
				<Follow />
				<Connect />
			</StyledInteractCont>
			<StyledSeeAllCont>
				<p>See followers & following</p>
			</StyledSeeAllCont>
		</div>
	);
};

export default Interact;

const StyledInteractCont = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
	grid-row-gap: 1rem;
	grid-column-gap: 1.25rem;

	button {
		min-width: 100%;
	}

	/* prettier-ignore */
	grid-template-areas:
		"follow connect"
	;

	@media screen and (max-width: 1300px) {
		/* prettier-ignore */
		grid-template-areas:
            "follow follow"
            "connect connect"
        ;

		margin-top: 1.5rem;
	}
`;

const StyledSeeAllCont = styled.div`
	min-width: 100%;

	p {
		text-align: center;
		font-size: 0.8rem;
		margin-top: 2rem;
		margin-bottom: 0;
		color: #9e9e9e;
	}
`;
