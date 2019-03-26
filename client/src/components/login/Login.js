import React from 'react';
import styled from 'styled-components';

import Container from '../styles/Container';
import Form from './Form';
import { ShapeSquareLeft } from '../styles/Shapes';

const Login = () => (
    <main>
        <Container>
            <StyledCont>
                <ShapeSquareLeft />
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