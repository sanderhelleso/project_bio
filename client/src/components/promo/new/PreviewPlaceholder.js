import React from 'react';
import styled from 'styled-components';

const PreviewPlaceholder = () => <StyledPlaceholder />;

export default PreviewPlaceholder;

const StyledPlaceholder = styled.div`
	min-height: 5rem;
	max-height: 5rem;
	min-width: 100%;
	background-color: #eeeeee;
	border-radius: 4px;
`;
