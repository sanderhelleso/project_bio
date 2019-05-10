import React from 'react';
import styled from 'styled-components';
import ModalShare from './ModalShare';

const ModalContent = ({ content }) => {
	const setContent = () => {
		switch (content) {
			case 'share':
				return <ModalShare />;
		}
	};

	return <StyledContent id="modal-inner">{setContent()}</StyledContent>;
};

export default ModalContent;

const StyledContent = styled.div`
	position: absolute;
	top: 30%;
	left: 50%;
	transform: translate(-50%);

	min-height: 300px;
	min-width: 500px;
	background-color: #ffffff;

	@media screen and (max-width: 600px) {
		min-width: 90%;
		min-height: 90vh;
		top: 5%;
	}
`;
