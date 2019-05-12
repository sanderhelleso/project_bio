import React, { useState } from 'react';
import styled from 'styled-components';
import Lightbox from 'react-image-lightbox';

const PreviewImage = ({ image, zindex, i }) => {
	const [ isOpen, modifyLightbox ] = useState(false);
	const [ imageSrc, setImageSrc ] = useState(`http://localhost:5000/${image}`);

	return (
		<StyledImage zindex={zindex} i={i}>
			<img src={imageSrc} onClick={() => modifyLightbox(!isOpen)} onError={() => setImageSrc(image)} />
			{isOpen && <Lightbox mainSrc={imageSrc} onCloseRequest={() => modifyLightbox(!isOpen)} />}
		</StyledImage>
	);
};

export default PreviewImage;

const StyledImage = styled.div`
	z-index: ${(props) => props.zindex};
	display: inline-block;
	position: absolute;
	margin-left: ${(props) => (props.i === 0 ? 0 : props.i * 2.5)}rem;

	img {
		cursor: pointer;
		max-height: 3.5rem;
		max-width: 3.5rem;
		min-height: 3.5rem;
		max-height: 3.5rem;
		border-radius: 50%;
		box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
		border: 2px solid ${(props) => props.theme.secondaryColor};
	}
`;
