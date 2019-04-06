import React, { useState } from 'react';
import styled from 'styled-components';
import FeaterIcons from 'feather-icons-react';
import Lightbox from 'react-image-lightbox';

const PromoImg = ({ image }) => {
	const [ isOpen, modifyLightbox ] = useState(false);

	return (
		<StyledImgCont>
			<img src={`http://localhost:5000/${image}`} />
			<span onClick={() => modifyLightbox(!isOpen)}>
				<FeaterIcons icon="zoom-in" /> Click to enlarge
			</span>
			<p>{isOpen ? 'open' : 'closed'}</p>
		</StyledImgCont>
	);
};

export default PromoImg;

const StyledImgCont = styled.div`
	min-width: 100%;
	text-align: center;
	margin-top: 2.5rem;

	img {
		object-fit: cover;
		width: 80%;
		height: 80%;
		max-height: 400px;
		max-width: 400px;
		border-radius: 20px;
		margin: 0 auto;
		box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
		cursor: pointer;
		transition: 0.3s ease-in-out;
	}

	span {
		display: block;
		margin: 2.5rem auto;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: #9e9e9e;

		svg {
			height: 1rem;
			width: 1rem;
			margin-bottom: -3px;
			margin-left: 7.5px;
		}
	}
`;
