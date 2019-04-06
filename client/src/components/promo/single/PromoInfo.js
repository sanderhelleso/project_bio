import React from 'react';
import styled from 'styled-components';
import PromoCode from './PromoCode';
import PromoLink from './PromoLink';
import PromoOwner from './PromoOwner';
import PromoPrice from './PromoPrice';

const PromoInfo = ({ title, description, promotion_code, CreatedAt, profile, active }) => {
	return (
		<StyledInfoCont>
			<StyledInfoHeader>
				<h2>{title}</h2>
				<PromoOwner {...profile} postedAt={CreatedAt} />
				<p>{description}</p>
			</StyledInfoHeader>
			<StyledInfoBody>
				<PromoPrice price={active.price} currency={active.currency} />
				<PromoCode code={promotion_code} />
				<PromoLink link={active.link} />
			</StyledInfoBody>
		</StyledInfoCont>
	);
};

export default PromoInfo;

const StyledInfoCont = styled.div`
	padding: 2rem;

	h2 {
		margin-top: 0;
	}

	p {
		font-size: 0.8rem;
		color: #252525;
	}

	border-right: 1px solid #eeeeee;
`;

const StyledInfoHeader = styled.div`
	margin-bottom: 2rem;
	padding-bottom: 1rem;
	border-bottom: 1px solid #eeeeee;
`;

const StyledInfoBody = styled.div``;
