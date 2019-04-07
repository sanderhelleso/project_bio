import React from 'react';
import styled from 'styled-components';
import { TextArea } from '../../styles/Input';

const ReplyComment = ({ handle }) => (
	<StyledCont>
		<TextArea placeholder={`Reply to ${handle}...`} />
	</StyledCont>
);

export default ReplyComment;

const StyledCont = styled.div`
	margin-top: 2rem;

	textarea {
		font-size: 0.9rem;
		padding: 8px;
		min-width: 100%;
		min-height: 100px;
		resize: none;
	}
`;
