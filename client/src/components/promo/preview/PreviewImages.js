import React from 'react';
import styled from 'styled-components';
import PreviewImage from './PreviewImage';

const PreviewImages = ({ images }) => {
	const renderImages = () => {
		return images.map((image, i) => {
			return <PreviewImage key={i} image={image} zindex={images.length - i + 1} i={i} />;
		});
	};

	return <StyledImagesCont>{renderImages()}</StyledImagesCont>;
};

export default PreviewImages;

const StyledImagesCont = styled.div`
	position: relative;
	margin: 2.5rem 0;
`;
