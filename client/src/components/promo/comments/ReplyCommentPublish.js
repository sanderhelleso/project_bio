import React from 'react';
import styled from 'styled-components';
import { Button, Buttons, FlatButton } from '../../styles/Button';
import FeatherIcons from 'feather-icons-react';

const ReplyCommentPublish = ({ updateState, curr, minLength, maxLength }) => (
	<StyledCont>
		<Buttons>
			<Button size="small" disabled={curr < minLength || curr > maxLength}>
				Publish
				<FeatherIcons icon="check" />
			</Button>
			<FlatButton size="small" onClick={() => updateState({ isOpen: false })}>
				Cancel
			</FlatButton>
		</Buttons>
	</StyledCont>
);

export default ReplyCommentPublish;

const StyledCont = styled.div`
	margin-top: 1rem;
	clear: both;
	button {
		float: right;
		margin-left: 1rem;
	}
`;
