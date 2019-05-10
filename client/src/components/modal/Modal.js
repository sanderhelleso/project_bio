import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../styles/Keyframes';

import ModalContent from './ModalContent';

const Modal = ({ close, content }) => (
	<StyledOverlay id="modal-overlay" onClick={(e) => (e.target.id === 'modal-overlay' ? close() : null)}>
		<ModalContent content={content} close={close} />
	</StyledOverlay>
);

export default Modal;

const StyledOverlay = styled.div`
	animation: ${fadeIn} 0.3s ease-in-out;
	z-index: 100;
	background-color: rgba(20, 20, 20, 0.7);
	position: fixed;
	top: 0;
	left: 0;
	min-width: 100%;
	min-height: 100vh;
`;
