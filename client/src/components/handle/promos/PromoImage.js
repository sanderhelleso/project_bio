import React, { useState } from 'react';
import styled from 'styled-components';

import Lightbox from 'react-image-lightbox';

const PromoImage = ({ image }) => {
	const setSrc = () => {
		const n = Math.floor(Math.random() * 3);

		if (n === 0) {
			return 'https://s23209.pcdn.co/wp-content/uploads/2018/10/Korean-Beef-TacosIMG_6959.jpg';
		} else if (n === 1) {
			return 'https://cdn-image.foodandwine.com/sites/default/files/texas-chile-short-rib-tacos-xl-recipe0317.jpg';
		}

		return 'https://d5dnlg5k9nac9.cloudfront.net/processed/thumbs/1be59757014205d43bfa5f60e9ad17a6ce12474b_r791_530.png';
	};

	const [ isOpen, modifyLightbox ] = useState(false);
	const [ imageSrc, setImageSrc ] = useState(setSrc());

	return (
		<StyledImgParent>
			<StyledImgChild src={imageSrc} onClick={() => modifyLightbox(!isOpen)} />
			{isOpen && <Lightbox mainSrc={imageSrc} onCloseRequest={() => modifyLightbox(!isOpen)} />}
		</StyledImgParent>
	);
};

export default PromoImage;

const StyledImgParent = styled.div`overflow: hidden;`;

const StyledImgChild = styled.div`
	background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3)), url(${(props) => props.src});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	transition: all 0.5s ease;
	min-width: 100%;
	min-height: 100%;
	cursor: pointer;

	&:hover,
	&:focus {
		transform: scale(1.2);
	}
`;
