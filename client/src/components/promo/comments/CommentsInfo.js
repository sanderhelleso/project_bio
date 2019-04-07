import React, { Fragment } from 'react';
import styled from 'styled-components';
import FeaterIcons from 'feather-icons-react';

const CommentsInfo = ({ comments }) => {
	const renderComments = () => {
		if (!comments.length) {
			return (
				<Fragment>
					<StyledHeading empty={true}>No comments has been posted yet</StyledHeading>
					<p>Be the first to create some life in here</p>
				</Fragment>
			);
		}

		return <StyledHeading>Showing {comments.length} comments</StyledHeading>;
	};

	return (
		<StyledInfo>
			{renderComments()}
			<FeaterIcons icon="volume-2" />
		</StyledInfo>
	);
};

export default CommentsInfo;

const StyledInfo = styled.div`
	text-align: center;

	p {
		color: #9e9e9e;
		font-weight: 100;
	}

	svg {
		height: 3.5rem;
		width: 3.5rem;
		stroke: ${(props) => props.theme.secondaryColor};
		margin: 2rem auto;
	}
`;

const StyledHeading = styled.h5`
	font-size: 1.5rem;
	margin-bottom: 0;
	color: ${(props) => (props.empty ? '' : '#9e9e9e')};
	font-weight: ${(props) => (props.empty ? '' : 100)};
`;
