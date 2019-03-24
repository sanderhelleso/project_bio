import React, { Component } from 'react';
import { login } from '../../api/login/login';
import { Button, Buttons, Instagram, } from '../styles/Button';
import { Inputs, Input } from '../styles/Input';
import FeatherIcon from 'feather-icons-react';
import styled from 'styled-components';

class Form extends Component {
    state = {
        email: 'johndoe@gmail.com',
        password: 'Randompass123',
        loading: false
    }

    async componentDidMount() {
        //const response = await login(this.state.email, this.state.password);
        //console.log(response);
    }


    render() {
        return (
            <form>
                <Inputs stack={true} stretch={true}>
                    <Input placeholder="E-Mail address" type="email" />
                    <Input placeholder="Password" type="password" />
                </Inputs>
               <Buttons stretch={true}>
                    <Button>Sign In</Button>
                    <StyledOr>OR</StyledOr>
                    <Instagram>
                        <span>
                            <FeatherIcon icon="instagram" />
                        </span>
                        Sign In with Instagram
                    </Instagram>
                </Buttons>
            </form>
        )
    }
}

export default Form;

const StyledOr = styled.span`
    text-align: center;
    display: block;
    min-width: 100%;
    margin: 0.5rem 0;
    font-size: 0.7rem;
    font-weight: 800;
`
