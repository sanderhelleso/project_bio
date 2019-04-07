import React from 'react';
import styled from 'styled-components';
import FeaterIcons from 'feather-icons-react';

const ScrollTopOfComments = ({ currAmount }) => {
	const scrollOption = currAmount > 20 ? null : { behavior: 'smooth' };

	const scrollTop = () => {
		const cont = document.querySelector('#comments-cont');
		cont.scrollIntoView(scrollOption);
	};

	return (
		<StyledScrollTop onClick={() => scrollTop()}>
			<FeaterIcons icon="arrow-up" />
		</StyledScrollTop>
	);
};

export default ScrollTopOfComments;

const StyledScrollTop = styled.div`
	margin: 3rem auto 0 auto;
	padding: 2rem;
	text-align: center;
	cursor: pointer;

	svg {
		height: 3.5rem;
		width: 3.5rem;
		stroke: #9e9e9e;
		opacity: 0.5;
	}
`;
