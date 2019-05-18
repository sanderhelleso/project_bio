import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';

import { getHandle } from '../../api/handle/handle';

import { mainGridStyles, HandleProfileCard, HandleRecentPromoCard, HandleSeeMorePromosCard } from '../styles/Card';
import Container from '../styles/Container';
import ProfileInfo from './profile/ProfileInfo';
import Interact from './interact/Interact';

import { withRouter } from 'react-router-dom';

const Handle = ({ match: { params } }) => {
	const [ state, updateState ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		loading: true,
		error: false,
		profile: null
	});

	const { loading, error, profile } = state;
	const { handle } = params;

	useEffect(() => {
		loadHandle();
	}, []);

	const loadHandle = async () => {
		const response = await getHandle(handle);
		console.log(response);

		if (response.status < 400) {
			return updateState({ loading: false, profile: response.payload });
		}

		updateState({ loading: false, error: response.message });
	};

	const renderHandle = () => {
		if (loading) {
			return <p>Loading</p>;
		}

		if (error) {
			return <p>{error}</p>;
		}

		return (
			<Container max={85}>
				<StyledHandleGrid>
					<HandleRecentPromoCard />
					<HandleProfileCard>
						<ProfileInfo {...profile} />
						<Interact />
					</HandleProfileCard>
					<HandleSeeMorePromosCard />
				</StyledHandleGrid>
			</Container>
		);
	};

	return renderHandle();
};

export default withRouter(Handle);

const StyledHandleGrid = styled.div`
	${mainGridStyles};
	grid-template-columns: minmax(0, 2fr) minmax(0, 0.75fr);

	/* prettier-ignore */
	grid-template-areas:
		"recentPromo profile"
		"seeMorePromos seeMorePromos"
	;
`;
