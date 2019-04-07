import React from 'react';
import styled from 'styled-components';
import { Button, Buttons, FlatButton } from '../../styles/Button';
import FeatherIcons from 'feather-icons-react';

const ReplyCommentPublish = ({ updateState, curr, minLength, maxLength }) => {
	return (
		<StyledCont>
			<Buttons>
				<Button size="small" disabled={curr.trim().length < minLength || curr.length > maxLength}>
					Publish
					<FeatherIcons icon="check" />
				</Button>
				<FlatButton size="small" onClick={() => updateState({ isOpen: false })}>
					Cancel
				</FlatButton>
			</Buttons>
		</StyledCont>
	);
};

export default ReplyCommentPublish;

const StyledCont = styled.div`
	margin-top: 1rem;
	button {
		float: right;
		margin-left: 1rem;
		margin-bottom: 1rem;
		@media screen and (max-width: 1060px) {
			min-width: 100%;
		}
	}
`;
