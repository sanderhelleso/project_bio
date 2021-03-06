import React, { useState } from 'react';
import styled from 'styled-components';

import Lightbox from 'react-image-lightbox';

const PromoImage = ({ image }) => {
	const [ isOpen, modifyLightbox ] = useState(false);
	const [ imageSrc, setImageSrc ] = useState(image);

	const setRot = () => Math.floor(Math.random() * 2);

	return (
		<StyledImgParent>
			<StyledImgChild rot={setRot()} src={imageSrc} onClick={() => modifyLightbox(!isOpen)} />
			{isOpen && <Lightbox mainSrc={imageSrc} onCloseRequest={() => modifyLightbox(!isOpen)} />}
		</StyledImgParent>
	);
};

export default PromoImage;

const StyledImgParent = styled.div`overflow: hidden;`;

const StyledImgChild = styled.div`
	background: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(${(props) => props.src});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	transition: all 0.5s ease;
	min-width: 100%;
	min-height: 100%;
	cursor: pointer;

	&:hover,
	&:focus {
		transform: ${(props) => `rotate(${props.rot ? 5 : -5}deg)`} scale(1.2);
	}
`;
