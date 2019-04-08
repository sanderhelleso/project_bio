import React from 'react';
import styled from 'styled-components';
import { Button, Buttons, FlatButton } from '../../styles/Button';
import FeatherIcons from 'feather-icons-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const ReplyCommentPublish = ({ updateState, comment, minLength, maxLength, handle, avatar }) => {
	const publishReply = async () => {
		const reply = {
			comment,
			profile: {
				handle,
				avatar,
				postedAt: new Date()
			}
		};

		updateState({ comment: '' });
	};

	return (
		<StyledCont>
			<Buttons>
				<Button
					size="small"
					disabled={comment.trim().length < minLength || comment.length > maxLength}
					onClick={() => publishReply()}
				>
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

const mapStateToProps = ({ profile: { handle, avatar } }) => {
	return { handle, avatar };
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplyCommentPublish);

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
