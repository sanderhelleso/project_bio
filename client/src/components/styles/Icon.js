import React from 'react';
import styled from 'styled-components';
import FeatherIcons from 'feather-icons-react';

const themes = {
	green: {
		bg: '#c8e6c9',
		color: '#81c784'
	},
	red: {
		bg: '#ffebee',
		color: '#e57373'
	},
	blue: {
		bg: '#e8eaf6',
		color: '#9fa8da'
	}
};

const iconStyles = `
min-height: 2.75rem;
	min-width: 2.75rem;
	max-height: 2.75rem;
	max-width: 2.75rem;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    display: inline-block;
    margin: 0 0.5rem;
    
    svg {
		position: absolute;
		top: 30%;
		left: 50%;
		transform: translate(-50%);
		height: 1.15rem;
		width: 1.15rem;
	}
`;

const StyledFavorite = styled.div`
	${iconStyles};
	background-color: ${themes.red.bg};

	svg {
		stroke: ${themes.red.color};
	}
`;

export const Favorite = () => (
	<StyledFavorite>
		<FeatherIcons icon="heart" />
	</StyledFavorite>
);

const StyledShare = styled.div`
	${iconStyles};
	background-color: ${themes.blue.bg};

	svg {
		stroke: ${themes.blue.color};
		left: 45%;
		transform: translate(-45%);
	}
`;

export const Share = () => (
	<StyledShare>
		<FeatherIcons icon="share-2" />
	</StyledShare>
);
