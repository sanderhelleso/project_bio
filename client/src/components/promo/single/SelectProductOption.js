import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../styles/Keyframes';

const SelectProductOption = ({ Name, active }) => {
	console.log(Name);
	return <StyledOption active={active} />;
};

export default SelectProductOption;

const StyledOption = styled.li`
	background-color: #eeeeee;
	border-radius: 50%;
	min-height: 4.5rem;
	max-width: 4.5rem;
	min-width: 4.5rem;
	margin: 2rem auto;
	border: 2px solid ${(props) => (props.active ? props.theme.secondaryColor : '#eeeeee')};
	cursor: pointer;
	transition: 0.3s ease-in-out;
	${fadeIn};

	&:hover {
		border: 2px solid ${(props) => props.theme.secondaryColor};
	}
`;
