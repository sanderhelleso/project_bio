import React from 'react';
import styled from 'styled-components';
import ModalShareAction from './ModalShareAction';

const ModalShare = () => {
	const actions = [
		{
			icon: 'facebook'
		},
		{
			icon: 'twitter'
		},
		{
			icon: 'mail'
		},
		{
			icon: 'copy'
		}
	];

	const renderIcons = () => {
		return actions.map((action) => <ModalShareAction icon={action.icon} />);
	};

	return (
		<StyledCont>
			<h5>Share</h5>
			<p>Spread the word! Share this promotion to the world.</p>
			<StyledIcons>{renderIcons()}</StyledIcons>
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
		color: #757575;
	}
`;

const StyledIcons = styled.div`
	text-align: center;
	margin-top: 2rem;
`;
