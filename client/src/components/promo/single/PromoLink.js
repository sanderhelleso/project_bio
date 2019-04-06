import React from 'react';
import styled from 'styled-components';
import FeaterIcons from 'feather-icons-react';

const PromoLink = ({ link }) => (
	<StyledLink href={link} target="blank">
		Show Now
		<FeaterIcons icon="arrow-right" />
	</StyledLink>
);

export default PromoLink;

const StyledLink = styled.a`
	display: inline-block;
	color: ${(props) => props.theme.secondaryColor};
	position: relative;
	cursor: pointer;
	letter-spacing: 1px;
	text-decoration: none;
	margin-top: 2rem;

	&:hover {
		svg {
			right: -30%;
		}
	}

	svg {
		height: 1.1rem;
		width: 1.1rem;
		opacity: 0.5;
		position: absolute;
		right: -20%;
		top: 15%;
		transition: 0.3s ease-in-out;
	}
`;
