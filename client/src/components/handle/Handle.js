import React, { useReducer, useEffect } from 'react';

import { getHandle } from '../../api/handle/handle';

import Container from '../styles/Container';
import ProfileInfo from './ProfileInfo';

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

		return <ProfileInfo {...profile} />;
	};

	return <Container max={70}>{renderHandle()}</Container>;
};

export default withRouter(Handle);
