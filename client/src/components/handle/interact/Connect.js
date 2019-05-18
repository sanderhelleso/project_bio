import React from 'react';
import styled from 'styled-components';
import { Button } from '../../styles/Button';

const Connect = () => {
	return (
		<StyledConnect>
			<Button size="small" border={true}>
				Connect
			</Button>
		</StyledConnect>
	);
};

export default Connect;

const StyledConnect = styled.div`grid-area: connect;`;
