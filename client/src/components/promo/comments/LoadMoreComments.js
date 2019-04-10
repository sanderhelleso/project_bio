import React, { useState } from 'react';
import styled from 'styled-components';
import FeaterIcons from 'feather-icons-react';
import { Button } from '../../styles/Button';
import updatePromoCommentsAction from '../../../actions/promoActions/updatePromoCommentsAction';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const LoadMore = ({ limit, updatePromoCommentsAction, listLength }) => {
	const [ loading, isLoading ] = useState(false);

	const fetchNewComments = () => {
		isLoading(true);
		const testData = [
			{
				id: listLength + 1,
				profile: {
					handle: Math.random(),
					avatar: '',
					postedAt: new Date()
				},
				comment:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
			},
			{
				id: listLength + 2,
				profile: {
					handle: Math.random(),
					avatar: '',
					postedAt: new Date()
				},
				comment:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
			},
			{
				id: listLength + 3,
				profile: {
					handle: Math.random(),
					avatar: '',
					postedAt: new Date()
				},
				comment:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
			}
		];

		updatePromoCommentsAction(testData);
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

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ updatePromoCommentsAction }, dispatch);
};

export default connect(null, mapDispatchToProps)(LoadMore);

const StyledCont = styled.div`
	min-width: 300px;
	margin: 2rem auto 1rem auto;

	button {
		min-width: 100%;

		svg {
			top: 35%;
		}
	}

	@media screen and (max-width: 600px) {
		min-width: 225px;
	}
`;
