import React, { Component } from 'react';
import { getPromo } from '../../../api/promo/promo';

class Single extends Component {
	state = { loading: true };

	async componentDidMount() {
		// attempt to load promo by the given handler and param ID
		const { handle, id } = this.props.match.params;
		const response = await getPromo(handle, id);
		console.log(response);
	}

	render() {
		return <div />;
	}
}

export default Single;
