import React from 'react';
import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';

const ModalShareAction = ({ action, icon }) => {
	return (
		<StyledAction>
			<FeatherIcon icon={icon} />
		</StyledAction>
	);
};

export default ModalShareAction;

const StyledAction = styled.div`
	display: inline-block;
	svg {
		stroke: #9e9e9e;
		height: 3.05rem;
		width: 3.05rem;
		margin: 1.5rem;
		cursor: pointer;
	}
`;
