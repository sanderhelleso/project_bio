import React, { Fragment } from 'react';
import styled from 'styled-components';

const CommentsInfo = ({ amountOfComments }) => {
	const renderComments = () => {
		if (!amountOfComments) {
			return (
				<Fragment>
					<StyledHeading empty={true}>No comments has been posted yet</StyledHeading>
					<p>Be the first to create some life in here</p>
				</Fragment>
			);
		}

		return (
			<StyledHeading>
				Showing {amountOfComments} comment{amountOfComments === 1 ? '' : 's'}
			</StyledHeading>
		);
	};

	return <StyledInfo>{renderComments()}</StyledInfo>;
};

export default CommentsInfo;

const StyledInfo = styled.div`
	text-align: center;

	p {
		color: #9e9e9e;
		font-weight: 100;
	}

	margin-bottom: 1.25rem;
`;

const StyledHeading = styled.h5`
	font-size: 1.5rem;
	margin-top: 1rem;
	margin-bottom: 0.5rem;
	color: ${(props) => (props.empty ? '' : '#9e9e9e')};
	font-weight: ${(props) => (props.empty ? '' : 100)};
	text-align: ${(props) => (props.empty ? '' : 'left')};
`;
