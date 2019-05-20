import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../styles/Button';

import Modal from '../../modal/Modal';

const Connect = () => {
	const [ isOpen, setModalState ] = useState(false);

	// close the model if open
	const close = () => setModalState(false);

	return (
		<StyledConnect>
			<Button size="small" border={true} onClick={() => setModalState(true)}>
				Connect
			</Button>
			{isOpen && <Modal close={close} content="connect" active={isOpen} />}
		</StyledConnect>
	);
};

export default Connect;

const StyledConnect = styled.div`grid-area: connect;`;
