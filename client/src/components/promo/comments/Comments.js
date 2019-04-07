import React from 'react';
import styled from 'styled-components';
import { CommentsCard } from '../../styles/Card';
import CommentsInfo from './CommentsInfo';

const Comments = () => {
	return (
		<CommentsCard>
			<CommentsInfo comments={[ 1, 2 ]} />
		</CommentsCard>
	);
};

export default Comments;
