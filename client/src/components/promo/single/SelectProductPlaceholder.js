import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../styles/Keyframes';

const SelectProductPlaceholder = () => <StyledPlaceholder />;

export default SelectProductPlaceholder;

const StyledPlaceholder = styled.div`
	border-radius: 50%;
	margin: 2rem auto;
	pointer-events: none;
	min-height: 5rem;
	max-width: 5rem;
	min-width: 5rem;
	max-height: 5rem;
	border: 2px solid #eeeeee;
	background-color: #eeeeee;
	${fadeIn};
`;
