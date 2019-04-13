import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { FlatButton } from '../../styles/Button';
import { Grid } from '../../styles/Grid';
import FeaterIcons from 'feather-icons-react';
import Publish from './Publish';

class DetailsOverview extends Component {
	renderButtons() {
		const editBtn = (
			<FlatButton onClick={() => this.props.backToPromo()}>
				<FeaterIcons icon="edit" />
				Edit
			</FlatButton>
		);

		return (
			<Fragment>
				<Publish disabled={!this.props.valid} promo={this.props.promo} />
				{editBtn}
			</Fragment>
		);
	}

	render() {
		return (
			<StyledCont>
				<div id="details">
					<div>
						<span>Title</span>
						<h3>{this.props.promo.title}</h3>
					</div>
					<p>{this.props.promo.description}</p>
				</div>
				<div id="btns">{this.renderButtons()}</div>
			</StyledCont>
		);
	}
}

export default DetailsOverview;

const StyledCont = styled.div`
	max-width: 95%;
	margin: 0 auto;
	min-height: 175px;
	padding-bottom: 3rem;
	margin-bottom: 4rem;
	border-bottom: 1px solid #e0e0e0;
	display: grid;
	grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);

	/* prettier-ignore */
	grid-template-areas: 
		"details buttons"
	;

	h3,
	p {
		word-wrap: break-word;
		max-width: 95%;
	}

	#details {
		max-width: 900px;
		grid-area: details;

		p {
			font-size: 0.9rem;
			color: #212121;
		}

		div {
			span {
				text-transform: uppercase;
				letter-spacing: 2px;
				color: #9e9e9e;
				font-size: 0.8rem;
			}
		}
	}

	#btns {
		grid-area: buttons;

		@media screen and (max-width: 600px) {
			button {
				margin-bottom: 0 !important;
			}
		}
	}

	@media screen and (max-width: 800px) {
		grid-template-columns: minmax(0, 1fr);
		padding-bottom: 4rem;
		max-width: 85%;
		margin: 0 auto 4rem auto;

		/* prettier-ignore */
		grid-template-areas: 
		"details"
		"buttons"
		;

		#details,
		#btns {
			max-width: 100%;
		}
	}
`;
