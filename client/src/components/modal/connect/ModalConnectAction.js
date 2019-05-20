import React from 'react';
import styled from 'styled-components';

import FeatherIcon from 'feather-icons-react';

const ModalConnectAction = ({ props, icon }) => {
	return (
		<StyledAction color={props.color}>
			<FeatherIcon icon={icon} />
			{props.text}
		</StyledAction>
	);
};

export default ModalConnectAction;

const StyledAction = styled.a`
	display: block;
	margin: 1.15rem 0;

	svg {
		float: left;
		margin-right: 1rem;
		height: 1.5rem;
		width: 1.5rem;

		stroke: ${(props) => props.color};
	}
`;
