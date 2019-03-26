import React, { Component } from 'react';
import styled from 'styled-components';

import Container from '../styles/Container';
import { Inputs, Input } from '../styles/Input';
import { Button } from '../styles/Button';

class NewProfile extends Component {
    state = this.props; // Initial profile data

    componentDidMount() {
        console.log(this.state);
    }

    render() {
        return (
            <Container>
                <StyledCont>
                    <Inputs stack={true} stretch={true}>
                        <Input type="text" placeholder="@yourhandle" />
                        <Input type="text" placeholder="What is your name?" />
                        <Input type="text" placeholder="Tell us about yourself, what do you promote?" />
                        <Input type="text" placeholder="Got an Instagram account? Share it!" />
                    </Inputs>
                    <Button>Create profile</Button>
                    <a>Need help?</a>
                </StyledCont>
            </Container>
        )
    }
}

export default NewProfile;

const StyledCont = styled.div`
    max-width: 500px;
    margin: 15vh auto;
    text-align: center;

    input {
        margin: 2rem 0;
    }

    button {
        margin: 1rem;
    }

    a {
        font-size: 0.9rem;
        color: #9e9e9e;
        display: block;
        margin-top: 1rem;
        cursor: pointer;
    }

`;

