import React from 'react';
import styled from 'styled-components';

const PreviewImage = ({ image, zindex, i }) => (
	<StyledImage zindex={zindex} i={i}>
		<img src={`http://localhost:5000/${image}`} onError={(e) => (e.target.src = image)} />
	</StyledImage>
);

export default PreviewImage;

const StyledImage = styled.div`
	z-index: ${(props) => props.zindex};
	display: inline-block;
	position: absolute;
	margin-left: ${(props) => (props.i === 0 ? 0 : props.i * 2.5)}rem;

	img {
		max-height: 3.5rem;
		max-width: 3.5rem;
		min-height: 3.5rem;
		max-height: 3.5rem;
		border-radius: 50%;
		box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
		border: 2px solid ${(props) => props.theme.secondaryColor};
	}
`;
