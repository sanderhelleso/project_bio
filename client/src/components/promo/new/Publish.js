import React, { Component } from 'react';
import { Button } from '../../styles/Button';
import FeaterIcons from 'feather-icons-react';
import { createPromo } from '../../../api/promo/promo';

class Publish extends Component {
	createPromo = async () => {
		const response = await createPromo(this.props.promo);
		console.log(response);
	};

	render() {
		return (
			<Button disabled={this.props.disabled} onClick={this.createPromo}>
				<FeaterIcons icon="check" />
				Publish
			</Button>
		);
	}
}

export default Publish;
