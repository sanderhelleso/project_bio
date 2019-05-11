import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Share } from '../../styles/Icon';
import Modal from '../../modal/Modal';

const SharePromo = () => {
	const [ isOpen, setModalState ] = useState(false);

	// close the model if open
	const close = () => setModalState(false);

	return (
		<Fragment>
			<span onClick={() => setModalState(true)}>
				<Share />
			</span>
			{isOpen && <Modal close={close} content="share" active={isOpen} />}
		</Fragment>
	);
};

export default SharePromo;
