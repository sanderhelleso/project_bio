import React from 'react';
import styled from 'styled-components';

const CharactersRemaining = ({ curr, max }) => (
	<StyledHelper>
		{curr}/{max} <span>remaining</span>
	</StyledHelper>
);

export default CharactersRemaining;

const StyledHelper = styled.span`
	float: right;
	font-size: 0.8rem;
	margin-right: 0.5rem;
	margin-top: 0.5rem;
	font-weight: 800;
	color: ${(props) => props.theme.weakerColor};

	span {
		font-weight: 400;
		margin-left: 3px;
	}
`;
