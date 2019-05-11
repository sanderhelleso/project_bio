import React from 'react';
import styled from 'styled-components';
import ModalShareAction from './ModalShareAction';

const ModalShare = () => {
	const URL = window.location.href;

	// list of share actions
	const actions = [
		{
			icon: 'facebook',
			props: {
				href: `http://www.facebook.com/sharer.php?u=${URL}`,
				target: '_blank',
				color: '#3C5A99'
			}
		},
		{
			icon: 'twitter',
			props: {
				href: `https://twitter.com/share?url=${URL}`,
				target: '_blank',
				color: '#38A1F3'
			}
		},
		{
			icon: 'mail',
			props: {
				href: `mailto:?Subject=${URL}`,
				color: '#BD081C'
			}
		},
		{
			icon: 'copy',
			props: {
				onClick: () => navigator.clipboard.writeText(URL),
				color: '#757575'
			}
		}
	];

	const renderIcons = () => {
		return actions.map((action) => <ModalShareAction {...action} />);
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

	@media screen and (max-width: 600px) {
		margin-top: 4.5rem;
	}
`;
