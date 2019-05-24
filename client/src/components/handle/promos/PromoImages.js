import React from 'react';
import styled from 'styled-components';

import PromoImage from './PromoImage';

const PromoImages = ({ images }) => {
	const renderImages = () => {
		return images.map((image, i) => {
			return <PromoImage key={i} image={image} />;
		});
	};

	return <StyledCont amount={images.length}>{renderImages()}</StyledCont>;
};

export default PromoImages;

const StyledCont = styled.div`
	display: grid;
	grid-template-columns: repeat(${(props) => props.amount}, minmax(0, 1fr));
	min-height: 200px;
`;
