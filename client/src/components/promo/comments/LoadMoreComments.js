import React, { useState } from 'react';
import styled from 'styled-components';
import FeaterIcons from 'feather-icons-react';
import { Button } from '../../styles/Button';

const LoadMore = ({ limit, listLength, loadMore }) => {
	const [ loading, isLoading ] = useState(false);

	const fetchNewComments = async () => {
		isLoading(true);
		await loadMore();
		isLoading(false);
	};

	return (
		listLength < limit && (
			<StyledCont>
				<Button onClick={() => fetchNewComments()} disabled={loading}>
					Show More
					<FeaterIcons icon="more-horizontal" />
				</Button>
			</StyledCont>
		)
	);
};

export default LoadMore;

const StyledCont = styled.div`
	min-width: 300px;
	margin: 2rem auto 1rem auto;
	text-align: center;

	button {
		min-width: 300px;
		background-color: transparent;
		border: 1px solid #9e9e9e;
		color: #9e9e9e;
		box-shadow: none;

		&:hover {
			opacity: 1;
		}

		svg {
			top: 35%;
		}

		@media screen and (max-width: 600px) {
			min-width: 225px;
			max-width: 225px;
		}
	}

	@media screen and (max-width: 600px) {
		min-width: 225px;
		max-width: 225px;
	}
`;
