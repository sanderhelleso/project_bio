import React from 'react';
import styled from 'styled-components';

const CharactersRemaining = ({ curr, max }) => (
	<StyledHelper>
		{curr}/{max} <span>remaining</span>
	</StyledHelper>
);

export default CharactersRemaining;

const StyledHelper = styled.span`
	float: left;
	font-size: 0.8rem;
	margin-top: 1rem;
	font-weight: 800;
	color: ${(props) => props.theme.weakerColor};

	span {
		font-weight: 400;
		margin-left: 3px;
	}
`;
