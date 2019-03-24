import React from 'react';
import styled from 'styled-components';

import Container from '../styles/Container';
import Form from './Form';

const Login = () => (
    <main>
        <Container>
            <StyledCont>
                <StyledHeading>Log In</StyledHeading>
                <Form />
            </StyledCont>
        </Container>
        <StyledShape />
    </main>
)

export default Login;

const StyledHeading = styled.h1`
    font-size: 4.5rem;
    color: #e0e0e0;
`;

const StyledCont = styled.div`
    position: relative;
    max-width: 500px;
    margin: 15vh auto;
    display: block;

    button {
        margin-top: 2rem;
    }
`;

const StyledShape = styled.span`
    
    background: #9796f0;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #fbc7d4, #9796f0);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #fbc7d4, #9796f0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border-radius: 30% 70% 60% 40% / 40% 26% 74% 60%;
    min-height: 60vh;
    min-width: 60vh;
    display: block;
    position: absolute;
    bottom: 10%;
    right: 10%;
    z-index: -1;
    opacity: 0.5;
`