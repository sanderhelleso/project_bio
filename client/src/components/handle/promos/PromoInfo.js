import React from 'react';
import styled from 'styled-components';

import { getFormatedDateAndTime } from '../../../lib/format';

const PromoInfo = ({ title, description, CreatedAt }) => {
	return (
		<StyledInfo>
			<h5>{title}</h5>
			<span className="postedAt">{getFormatedDateAndTime(new Date(CreatedAt).getTime())}</span>
			<p>{description}</p>
		</StyledInfo>
	);
};

export default PromoInfo;

const StyledInfo = styled.div`
	padding: 1rem;
	min-height: 150px;

	h5 {
		margin: 0.25rem 0;
		margin-bottom: 0;
		font-size: 1.25rem;
		letter-spacing: 2px;
		font-weight: 800;
	}

	p {
		font-size: 0.8rem;
		margin-top: 1.2rem;
	}

	.postedAt {
		font-size: 0.8rem;
		color: #9e9e9e;
		font-weight: 100;
	}
`;
