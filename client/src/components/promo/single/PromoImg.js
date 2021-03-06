import React, { useState } from 'react';
import styled from 'styled-components';
import FeaterIcons from 'feather-icons-react';
import Lightbox from 'react-image-lightbox';
import { fadeIn } from '../../styles/Keyframes';

const PromoImg = ({ image }) => {
	const [ isOpen, modifyLightbox ] = useState(false);
	const [ imageSrc, setImageSrc ] = useState(`http://localhost:5000/${image}`);

	return (
		<StyledImgCont>
			<img src={imageSrc} onClick={() => modifyLightbox(!isOpen)} onError={() => setImageSrc(image)} />
			<span className="no-select">
				<FeaterIcons icon="zoom-in" /> Click image to enlarge
			</span>
			{isOpen && <Lightbox mainSrc={imageSrc} onCloseRequest={() => modifyLightbox(!isOpen)} />}
		</StyledImgCont>
	);
};

export default PromoImg;

const StyledImgCont = styled.div`
	animation: ${fadeIn} 0.5s ease-in-out;
	min-width: 100%;
	text-align: center;
	margin-top: 5.65rem;
	grid-area: image;

	img {
		object-fit: cover;
		width: 80%;
		height: 80%;
		max-height: 400px;
		max-width: 400px;
		border-radius: 12px;
		margin: 0 auto;
		box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
		cursor: pointer;
		transition: 0.3s ease-in-out;
	}

	span {
		display: block;
		margin: 2.5rem auto;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: #9e9e9e;
		pointer-events: none;

		svg {
			height: 1rem;
			width: 1rem;
			margin-bottom: -3px;
			margin-left: 7.5px;
		}
	}

	@media screen and (max-width: 600px) {
		margin-top: 3rem;
	}
`;
