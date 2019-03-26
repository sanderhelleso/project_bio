import React from 'react';
import styled from 'styled-components';

import Container from '../styles/Container';
import Form from './Form';

const Login = () => (
    <main>
        <Container>
            <StyledCont>
                <StyledShape2 />
                <h1>Get Started</h1>
                <p>
                    Your fans are waiting, it only takes a couple of seconds!<br/>
                    Dont have an account? Dont worry, we create one for you.
                </p>
                <Form />
            </StyledCont>
        </Container>
    </main>
)

export default Login;

const StyledCont = styled.div`
    position: relative;
    max-width: 500px;
    margin: 12.5vh auto;
    position: relative;

    button, input {
        margin: 1rem 0;
    }

    #login {
        position: relative;

        svg {
            height: 1.5rem;
            width: 1.5rem;
            opacity: 0.5;
            position: absolute;
            right: 5%;
            top: 30%;
        }
    }

    h1 {
        font-size: 4rem;
        color: ${props => props.theme.primaryText};
        margin-left: -2.5rem;
        margin-bottom: 0;
        margin-top: 0;
    }

    p {
        margin-bottom: 3rem;
        color: ${props => props.theme.primaryText};
    }
`;

const StyledShape = styled.span`
    background: #9796f0;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #fbc7d4, #9796f0);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #fbc7d4, #9796f0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border-radius: 30% 70% 60% 40% / 40% 26% 74% 60%;
    min-height: 20rem;
    min-width: 20rem;
    display: block;
    position: absolute;
    top: -7.5%;
    left: -35%;
    z-index: -1;
    opacity: 0.5;
`

const StyledShape2 = styled.span`
    z-index: -1;
    opacity: 0.5;
    min-height: 25rem;
    min-width: 25rem;
    display: block;
    position: absolute;
    top: -3.5%;
    left: -35%;
    background-color: #eeeeee;
    transform: rotate(-10deg);
`;