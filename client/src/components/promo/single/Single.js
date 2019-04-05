import React, { Component } from 'react';
import { getPromo } from '../../../api/promo/promo';

class Single extends Component {
	state = { loading: true };

	async componentDidMount() {
		// attempt to load promo by the given param ID
		const response = await getPromo(this.props.match.params.id);
		console.log(response);
	}

	render() {
		return <div />;
	}
}

export default Single;
