import React from 'react';
import styled from 'styled-components';
import PromoCode from './PromoCode';
import PromoLink from './PromoLink';
import PromoOwner from './PromoOwner';

const PromoInfo = ({ title, description, promotion_code, link, CreatedAt, profile }) => {
	return (
		<StyledInfoCont>
			<StyledInfoHeader>
				<h2>{title}</h2>
				<PromoOwner {...profile} postedAt={CreatedAt} />
				<p>{description}</p>
			</StyledInfoHeader>
			<PromoCode code={promotion_code} />
			<PromoLink link={link} />
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

const StyledInfoHeader = styled.div`margin-bottom: 2rem;`;
