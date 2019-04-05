import React from 'react';
import styled from 'styled-components';

const PromoInfo = ({ Title, description }) => {
	console.log(Title);
	return <StyledInfoCont />;
};

export default PromoInfo;

const StyledInfoCont = styled.div`padding: 2rem;`;
