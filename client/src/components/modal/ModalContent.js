import React from 'react';
import styled from 'styled-components';

import ModalClose from './ModalClose';
import ModalShare from './share/ModalShare';
import ModalConnect from './connect/ModalConnect';

const ModalContent = ({ close, content }) => {
	const setContent = () => {
		switch (content) {
			case 'share':
				return <ModalShare />;

			case 'connect':
				return <ModalConnect />;
		}
	};

	return (
		<StyledContent>
			<ModalClose close={close} />
			{setContent()}
		</StyledContent>
	);
};

export default ModalContent;

const StyledContent = styled.div`
	position: absolute;
	top: 30%;
	left: 50%;
	transform: translate(-50%);

	padding: 2rem;
	min-height: 300px;
	min-width: 500px;
	background-color: #ffffff;
	box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
	border-radius: 4px;

	h5 {
		margin: 0;
		font-size: 1.5rem;
	}

	@media screen and (max-width: 600px) {
		min-width: 90%;
		min-height: 90vh;
		top: 5%;
	}
`;
