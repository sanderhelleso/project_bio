import React, { useState } from 'react';
import styled from 'styled-components';
import FeaterIcons from 'feather-icons-react';
import { Button } from '../../styles/Button';

const LoadMore = ({ updateComments, fetchFromIndex, comments, limit }) => {
	const [ loading, isLoading ] = useState(false);

	const fetchNewComments = () => {
		isLoading(true);
		const testData = [
			{
				id: comments.length + 1,
				profile: {
					handle: Math.random(),
					avatar: '',
					postedAt: new Date()
				},
				comment:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
			},
			{
				id: comments.length + 2,
				profile: {
					handle: Math.random(),
					avatar: '',
					postedAt: new Date()
				},
				comment:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
			},
			{
				id: comments.length + 3,
				profile: {
					handle: Math.random(),
					avatar: '',
					postedAt: new Date()
				},
				comment:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
			}
		];

		updateComments({ comments: [ ...comments, ...testData ] });

		isLoading(false);
	};

	return (
		comments.length < limit && (
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

	button {
		min-width: 100%;

		svg {
			top: 35%;
		}
	}
`;
