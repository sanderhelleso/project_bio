import React from 'react';
import styled from 'styled-components';

const ModalShare = () => {
	return (
		<StyledCont>
			<h5>Share</h5>
			<p>Spread the word! Share this promotion to the world.</p>
		</StyledCont>
	);
};

export default ModalShare;

const StyledCont = styled.div`
	padding: 2rem;

	h5 {
		margin: 0;
		font-size: 1.5rem;
	}

	p {
		font-size: 0.9rem;
		color: #9e9e9e;
	}
`;
