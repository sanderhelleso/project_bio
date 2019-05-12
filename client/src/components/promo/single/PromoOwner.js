import React from 'react';
import styled from 'styled-components';

import { withRouter } from 'react-router-dom';
import { tsToDate } from '../../../lib/format';

import { connect } from 'react-redux';

const PromoOwner = ({ avatar, handle, postedAt, history }) => (
	<StyledOwnerCont>
		<img
			src={`http://localhost:5000/${avatar || 'images/avatars/default.jpg'}`}
			alt={`${handle}'s avatar`}
			onClick={() => history.push(`/${handle}`)}
		/>
		<span id="handle" onClick={() => history.push(`/${handle}`)}>
			<span>{tsToDate(postedAt)}</span>
			{handle}
		</span>
	</StyledOwnerCont>
);

const mapStateToProps = ({ promos: { viewing: { profile: { avatar, handle } } } }) => {
	return { avatar, handle };
};

export default connect(mapStateToProps, null)(withRouter(PromoOwner));

const StyledOwnerCont = styled.div`
	display: grid;
	grid-template-columns: 3rem 85%;
	margin-bottom: 2rem;

	#handle {
		cursor: pointer;
	}

	img {
		min-width: 2.35rem;
		max-width: 2.35rem;
		min-height: 2.35rem;
		max-height: 2.35rem;
		border-radius: 4px;
		cursor: pointer;
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
	}

	span {
		span {
			font-size: 0.75rem;
			color: #9e9e9e;
			display: block;
		}
	}
`;
