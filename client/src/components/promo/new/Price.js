import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Input, Label } from '../../styles/Input';

class Price extends Component {
	fields = [
		{
			placeholder: 'Price',
			max: 10,
			name: 'price',
			type: 'text',
			onChange: (e) => this.formatPrice(e)
		},
		{
			placeholder: 'Currency',
			max: 3,
			name: 'currency',
			type: 'text',
			onChange: (e) => this.formatCurrency(e)
		}
	];

	formatPrice = (e) => {
		e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
		this.props.onChange(e);
	};

	formatCurrency = (e) => {
		if (e.target.value.length > 3) return;

		e.target.value = e.target.value.toUpperCase();
		this.props.onChange(e);
	};

	renderFields() {
		return this.fields.map((field) => {
			return <Input key={field.name} value={this.props[field.name]} {...field} />;
		});
	}

	render() {
		return (
			<Fragment>
				<Label htmlFor="price" text="Price & Currency" />
				<StyledPrice>{this.renderFields()}</StyledPrice>
			</Fragment>
		);
	}
}

export default Price;

const StyledPrice = styled.div`
	input {
		max-width: 47.5%;
		min-width: 47.5%;

		&:nth-child(1) {
			margin-right: 5%;
		}
	}
`;
