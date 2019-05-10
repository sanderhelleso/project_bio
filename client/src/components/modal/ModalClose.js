import React from 'react';
import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';

const ModalClose = ({ close }) => (
	<StyledIcon onClick={() => close()}>
		<FeatherIcon icon="x" />
	</StyledIcon>
);

export default ModalClose;

const StyledIcon = styled.span`
	position: absolute;
	top: 5%;
	right: 3%;
	cursor: pointer;

	svg {
		stroke: #9e9e9e;
		height: 1.5rem;
		width: 1.5rem;
	}
`;
