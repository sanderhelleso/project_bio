import React from 'react';
import styled from 'styled-components';

const ModalContent = (props) => <StyledContent id="modal-inner" />;

export default ModalContent;

const StyledContent = styled.div`
	position: absolute;
	top: 35%;
	left: 50%;
	transform: translate(-50%);

	min-height: 200px;
	min-width: 200px;
	background-color: #ffffff;
`;
