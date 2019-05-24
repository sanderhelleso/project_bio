import React from 'react';
import styled from 'styled-components';
import FeatherIcons from 'feather-icons-react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getFormatedDateAndTime } from '../../../lib/format';

const PromoInfo = ({ title, description, createdAt, discount, promoID, handle, history }) => {
	const formatTitle = () => {
		if (title.length > 20) {
			return `${title.substring(0, 20)}...`;
		}

		return title;
	};

	return (
		<StyledInfo>
			<div className="info-cont">
				<h5>{formatTitle()}</h5>
				<span className="posted-at">{getFormatedDateAndTime(new Date(createdAt).getTime())}</span>
				<p>{description}</p>
			</div>
			<StyledCont>
				<span className="discount">
					<span>{discount}% OFF</span>
				</span>
				<span className="to-promo" onClick={() => history.push(`/${handle}/promos/${promoID}`)}>
					<FeatherIcons icon="arrow-right-circle" />
				</span>
			</StyledCont>
		</StyledInfo>
	);
};

const mapStateToProps = ({ profile: { viewing: { handle } } }) => {
	return { handle };
};

export default connect(mapStateToProps, null)(withRouter(PromoInfo));

const StyledInfo = styled.div`
	.info-cont {
		padding: 1rem;
		min-height: 150px;
	}

	h5 {
		margin: 0.25rem 0;
		margin-bottom: 0;
		font-size: 1.25rem;
		letter-spacing: 2px;
		font-weight: 800;
	}

	p {
		font-size: 0.8rem;
		margin: 1.2rem 0;
	}

	.posted-at {
		font-size: 0.8rem;
		color: #9e9e9e;
		font-weight: 100;
	}
`;

const StyledCont = styled.div`
	min-height: 60px;
	min-width: 100%;
	position: relative;
	margin-top: 1rem;

	.discount {
		border-radius: 0% 100% 16% 84% / 100% 34% 66% 0%;
		min-width: 135px;
		background-color: #f0f3f5;
		padding: 1.25rem;
		padding-top: 1.35rem;
		position: absolute;
		bottom: 0;
		left: 0;

		span {
			margin-top: 0.5rem;
		}
	}

	span {
		font-weight: 800;
		color: #757575;
		font-size: 1.25rem;
	}

	.to-promo {
		float: right;
		margin-right: 2rem;
		cursor: pointer;
		opacity: 0.6;

		svg {
			height: 2.25rem;
			width: 2.25rem;
		}
	}
`;
