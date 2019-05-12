import React, { useReducer, useEffect } from 'react';

import { getHandle } from '../../api/handle/handle';

import { withRouter } from 'react-router-dom';

const Handle = ({ match: { params } }) => {
	const [ state, updateState ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		loading: true,
		error: false,
		data: null
	});

	const { loading, error, data } = state;
	const { handle } = params;

	useEffect(() => {
		loadHandle();
	}, []);

	const loadHandle = async () => {
		const response = await getHandle(handle);
		if (response.status < 400) {
		}

		updateState({ loading: false, error: response.status > 400 });
		console.log(response);
	};

	const renderHandle = () => {
		if (loading) {
			return <p>Loading</p>;
		}

		if (error) {
			return <p>Unable to fetch</p>;
		}

		return <p>Fetched</p>;
	};

	return renderHandle();
};

export default withRouter(Handle);
