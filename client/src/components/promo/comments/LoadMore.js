import React from 'react';
import styled from 'styled-components';
import FeaterIcons from 'feather-icons-react';
import { Button } from '../../styles/Button';

const LoadMore = () => (
	<StyledCont>
		<Button>
			Show More
			<FeaterIcons icon="more-horizontal" />
		</Button>
	</StyledCont>
);

export default LoadMore;

const StyledCont = styled.div`
	min-width: 300px;
	margin: 2rem auto 1rem auto;

	button {
		min-width: 100%;

		svg {
			top: 35%;
		}
	}
`;
