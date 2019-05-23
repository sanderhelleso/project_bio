import React from 'react';
import styled from 'styled-components';

const PromoInfo = ({ title }) => {
	return (
		<StyledInfo>
			<h5>{title}</h5>
		</StyledInfo>
	);
};

export default PromoInfo;

const StyledInfo = styled.div`
	padding: 1rem;
	min-height: 150px;
`;
