import React, { Component } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { Label } from '../../styles/Input';
import { categories } from '../../../lib/data';

class SelectCategory extends Component {
	options = categories;

	handleChange = (e) => {
		this.props.handleChange(e.value);
	};

	formatGroupLabel = (options) => <span>{options.label}</span>;

	render() {
		return (
			<StyledSelect>
				<Label htmlFor="category" text="Category" />
				<Select
					name="category"
					value={this.options.find((o) => o.value === this.props.category)}
					options={this.options}
					onChange={(e) => this.handleChange(e)}
					styles={selectStyles}
					theme={(theme) => ({
						...theme,
						colors: {
							...theme.colors,
							primary: '#6927ff'
						}
					})}
				/>
			</StyledSelect>
		);
	}
}

export default SelectCategory;

const StyledSelect = styled.div`
	input {
		min-height: 2.65rem;
		max-height: 2.65rem;
		padding: 26.5px 8px;
	}
`;

const selectStyles = {
	control: (base, state) => ({
		...base,
		borderRadius: '4px',
		outline: 'none',
		transition: '0.3s ease-in-out',
		boxShadow: state.isFocused || state.isActive ? '0 0 0 2px #837dff' : 'none',
		border: state.isFocused || state.isActive ? '1.5px solid #837dff' : '1.5px solid #e0e0e0'
	})
};
