import React from 'react';
import styled from 'styled-components';

const PreviewInfo = ({ title, description }) => {
	const cropDescription = () => {
		if (description.length > 200) {
			return `${description.substring(0, 200)}...`;
		}

		return description;
	};

	return (
		<StyledInfo>
			<h3>{title}</h3>
			<p>{cropDescription()}</p>
		</StyledInfo>
	);
};

export default PreviewInfo;

const StyledInfo = styled.div`
	position: relative;
	h3 {
		font-size: 1.5rem;
	}

	p {
		font-size: 0.8rem;
	}
`;
