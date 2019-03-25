import React, { Component, Fragment } from 'react';
import { login } from '../../api/login/login';
import { Button, Buttons, Instagram, } from '../styles/Button';
import { Inputs, Input } from '../styles/Input';
import FeatherIcon from 'feather-icons-react';
import styled from 'styled-components';

class Form extends Component {
    state = {
        email: '',
        password: '',
        loading: false
    }

    attemptLogin = async () => {
        this.setState({ loading: true });

        const response = await login(this.state.email, this.state.password);
        console.log(response);

        this.setState({ loading: false })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        return (
            <Fragment>
                <Inputs stack={true} stretch={true}>
                    <Input 
                        placeholder="E-Mail address" 
                        type="email"
                        name="email"
                        onChange={e => this.handleChange(e)}
                    />
                    <Input 
                        placeholder="Password" 
                        type="password"
                        name="password"
                        onChange={e => this.handleChange(e)}
                    />
                </Inputs>
               <Buttons stretch={true}>
                    <Button 
                        disabled={this.state.loading}
                        onClick={() => this.attemptLogin()}
                    >
                        Sign In
                    </Button>
                    <StyledOr>OR</StyledOr>
                    <Instagram disabled={this.state.loading}>
                        <span>
                            <FeatherIcon icon="instagram" />
                        </span>
                        Sign In with Instagram
                    </Instagram>
                </Buttons>
            </Fragment>
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
