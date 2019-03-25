import React, { Component, Fragment } from 'react';
import { withToastManager } from 'react-toast-notifications';

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

        // display notification status
        const { toastManager } = this.props;
        toastManager.add(response.status < 400 ? response.message : response.error, {
            appearance: response.status < 400 ? 'success' : 'error',
            autoDismiss: !response.newUser
        })
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

export default Form = withToastManager(Form);

const StyledOr = styled.span`
    text-align: center;
    display: block;
    min-width: 100%;
    margin: 0.5rem 0;
    font-size: 0.7rem;
    font-weight: 800;
`
