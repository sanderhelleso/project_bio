import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Input, Label } from '../../styles/Input';

const Price = (props) => {
	const fields = [
		{
			placeholder: 'Price',
			max: 10,
			name: 'price',
			type: 'text',
			onChange: (e) => formatPrice(e)
		},
		{
			placeholder: 'Currency',
			max: 3,
			name: 'currency',
			type: 'text',
			onChange: (e) => formatCurrency(e)
		}
	];

	const formatPrice = (e) => {
		e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
		props.onChange(e);
	};

	const formatCurrency = (e) => {
		if (e.target.value.length > 3) return;

		e.target.value = e.target.value.toUpperCase();
		props.onChange(e);
	};

	const renderFields = () => {
		return fields.map((field) => {
			return <Input key={field.name} value={props[field.name]} {...field} />;
		});
	};

	return (
		<Fragment>
			<Label htmlFor="price" text="Price & Currency" />
			<StyledPrice>{renderFields()}</StyledPrice>
		</Fragment>
	);
};

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
