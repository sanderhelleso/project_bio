import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import SelectCategory from './SelectCategory';
import { Inputs, Input, Label } from '../../styles/Input';
import { Button } from '../../styles/Button';
import FeatherIcons from 'feather-icons-react';
import { alertFormError } from '../../../lib/alert';
import { withToastManager } from 'react-toast-notifications';
import { Checkbox } from '../../styles/Checkbox';

import { validateFormByObj } from '../../../validators/validate';
import promoErrHandler from '../../../validators/promo';

class PromoForm extends Component {
	state = {
		promo: this.props.promo,
		checked: false,
		infoFields: [
			{
				placeholder: 'Title of promotion',
				max: 70,
				min: 1,
				name: 'title',
				type: 'text',
				required: true,
				error: false
			},
			{
				placeholder: 'Description of promotion',
				max: 255,
				min: 1,
				name: 'description',
				type: 'text',
				required: true,
				error: false
			}
		],
		codeFields: []
	};

	componentDidMount = () => {
		window.scrollTo(0, 0);

		this.setState(
			{
				checked: this.props.promo.code ? true : false
			},
			() => {
				// set code fields with potensial deactivation
				this.setState({
					codeFields: [
						{
							placeholder: 'Promotion code',
							max: 255,
							min: 2,
							name: 'code',
							type: 'text',
							required: true,
							error: false,
							disabled: !this.state.checked
						},
						{
							placeholder: 'Discount amount',
							max: 3,
							min: 1,
							name: 'discount',
							type: 'text',
							required: true,
							error: false,
							disabled: !this.state.checked,
							onChange: (e) => (!isNaN(e.target.value) ? this.formatStringNumFromEvent(e) : null)
						},
						{
							placeholder: 'When does the promotion expire?',
							name: 'expires',
							type: 'date',
							required: true,
							min: new Date().toISOString().split('T')[0],
							error: false,
							disabled: !this.state.checked
						}
					]
				});
			}
		);
	};

	formatStringNumFromEvent = (e) => {
		const parsed = parseInt(e.target.value);

		// remove trailing zeros
		e.target.value = e.target.value
			.split('')
			.map((c) => (c === '0' && e.target.value.length === 1 ? '' : c))
			.join('');

		if (parsed < 0) e.target.value = 1;
		if (parsed > 100) e.target.value = 100;

		this.handleChange(e);
	};

	handleChange = (e) => {
		// handles all fields and select
		const toUpdate = typeof e === 'object' ? { [e.target.name]: e.target.value } : { ['category']: e };

		this.setState({
			promo: {
				...this.state.promo,
				...toUpdate
			}
		});
	};

	handleCheckboxChange = () => {
		this.setState({
			checked: !this.state.checked,
			codeFields: this.state.codeFields.map((f) => ({ ...f, disabled: this.state.checked }))
		});
	};

	validatePromo() {
		// handle validation
		const { category, title, description } = this.state.promo;
		const valid = validateFormByObj(
			this.state.checked ? this.state.promo : { category, title, description },
			promoErrHandler
		);

		if (typeof valid === 'object') {
			return valid.forEach((err) => alertFormError(this.props, err));
		}

		this.props.updatePromo(this.state.promo);
	}

	renderFields(fields) {
		return fields.map((field) => {
			return (
				<Fragment key={field.name}>
					<Label htmlFor={field.name} text={field.name.split('_').join(' ')} />
					<Input
						{...field}
						value={this.state.promo[field.name] || ''}
						onChange={field.onChange || ((e) => this.handleChange(e))}
					/>
				</Fragment>
			);
		});
	}

	render() {
		return (
			<StyledCont>
				<StyledGrid>
					<StyledForm id="info-form">
						<Inputs stretch={true}>
							<SelectCategory category={this.state.promo.category} handleChange={this.handleChange} />
							{this.renderFields(this.state.infoFields)}
						</Inputs>
					</StyledForm>
					<div>
						<div id="checkbox">
							<label className="no-select">
								<Checkbox checked={this.state.checked} onChange={() => this.handleCheckboxChange()} />
								<span>Got a promotion code?</span>
							</label>
						</div>
						<StyledForm>
							<Inputs stretch={true}>{this.renderFields(this.state.codeFields)}</Inputs>
						</StyledForm>
						<Button onClick={() => this.validatePromo()}>
							<FeatherIcons icon="arrow-right" />
							Continue
						</Button>
					</div>
				</StyledGrid>
			</StyledCont>
		);
	}
}

export default withToastManager(PromoForm);

const StyledForm = styled.div`min-width: 500px;`;

const StyledCont = styled.div`
	max-width: 85%;
	margin: 6rem auto;

	button {
		min-width: 250px !important;
		margin-top: 3rem !important;
	}
`;

const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-column-gap: 4rem;
	justify-items: center;
	align-content: space-evenly;

	#info-form {
		margin-top: 2.3rem;
	}

	#checkbox {
		span {
			font-weight: 600;
			margin-left: 0.75rem;
			font-size: 1rem;
			text-transform: uppercase;
			letter-spacing: 2px;
			color: #253858;
			pointer-events: none;
		}
	}
`;
