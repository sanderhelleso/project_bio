import React from 'react';
import styled from 'styled-components';

import ModalConnectAction from './ModalConnectAction';

const ModalConnect = () => {
	const actions = [
		{
			icon: 'facebook',
			props: {
				href: `http://www.facebook.com/sharer.php?u=${URL}`,
				target: '_blank',
				text: 'sanderhelleso',
				color: '#3C5A99'
			}
		},
		{
			icon: 'twitter',
			props: {
				href: `https://twitter.com/share?url=${URL}`,
				target: '_blank',
				text: 'sanderhelleso',
				color: '#38A1F3'
			}
		}
	];

	const renderConnections = () => {
		return actions.map((action, i) => <ModalConnectAction key={i} {...action} />);
	};

	return (
		<StyledCont>
			<h5>Connect</h5>
			<p>Connect with 'user'</p>
			<div id="connections">{renderConnections()}</div>
		</StyledCont>
	);
};

export default ModalConnect;

const StyledCont = styled.div`
	#connections {
		margin: 2rem 0;
	}
`;
