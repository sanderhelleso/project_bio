import React from 'react';
import styled from 'styled-components';

import ModalContent from './ModalContent';

const Modal = (props) => (
	<StyledOverlay onClick={(e) => (e.target.id !== 'modal-inner' ? props.close() : null)}>
		<ModalContent />
	</StyledOverlay>
);

export default Modal;

const StyledOverlay = styled.div`
	z-index: 100;
	background-color: rgba(20, 20, 20, 0.7);
	position: fixed;
	top: 0;
	left: 0;
	min-width: 100%;
	min-height: 100vh;
`;
