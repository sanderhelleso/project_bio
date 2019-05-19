import React from 'react';
import styled from 'styled-components';

import Follow from './Follow';
import Connect from './Connect';

import { connect } from 'react-redux';

const Interact = ({ userID, userFollowingID }) => {
	// if ids are the same, we disallow some features like following urself
	// aswell as modifying the grid layout to accomendate the changes in the layout
	const isSame = userID === userFollowingID;

	return (
		<div>
			<StyledInteractCont isSame={isSame}>
				{!isSame && <Follow {...{ userID, userFollowingID }} />}
				<Connect />
			</StyledInteractCont>
			<StyledSeeAllCont>
				<p>See followers & following</p>
			</StyledSeeAllCont>
		</div>
	);
};

const mapStateToProps = ({ profile }) => {
	return { userID: profile.viewing.userID, userFollowingID: profile.userID };
};

export default connect(mapStateToProps, null)(Interact);

const StyledInteractCont = styled.div`
	display: ${(props) => (props.isSame ? 'block' : 'grid')};
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

		margin-top: ${(props) => (props.isSame ? '-1rem' : '1.5rem')};
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
