import React from 'react';
import styled from 'styled-components';

const PromoImg = ({ image }) => (
	<StyledImgCont>
		<img src={`http://localhost:5000/${image}`} />
	</StyledImgCont>
);

export default PromoImg;

const StyledImgCont = styled.div`
	background-color: #eeeeee;

	img {
		min-height: 100%;
		width: 100%;
	}
`;
