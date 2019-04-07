import React from 'react';
import styled from 'styled-components';
import { getFormatedDateAndTime } from '../../../lib/format';

const CommentInfo = ({ handle, postedAt }) => (
	<StyledInfo>
		<span>{getFormatedDateAndTime(postedAt)}</span>
		<h5>{handle}</h5>
	</StyledInfo>
);

export default CommentInfo;

const StyledInfo = styled.div`
	grid-area: info;
	margin-bottom: -5px;

	span {
		font-size: 0.7rem;
		color: #9e9e9e;
	}

	h5 {
		margin: 0;
		font-size: 1rem;
		font-weight: 400;
	}
`;
