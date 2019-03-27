import React, { Component, Fragment } from 'react';
import { withToastManager } from 'react-toast-notifications';
import { withRouter } from 'react-router-dom'

import { login } from '../../api/login/login';
import { Button, Buttons, Instagram, } from '../styles/Button';
import { Inputs, Input } from '../styles/Input';
import FeatherIcon from 'feather-icons-react';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import loginAction from '../../actions/userActions/loginAction';


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
        toastManager.add(response.message, {
            appearance: response.status < 400 ? 'success' : 'error',
            autoDismiss: !response.newUser,
        });

        // login user if successfull
        if (response.status < 400) {
            return this.props.loginAction(response.token)
        }

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
                        id="login" 
                        disabled={this.state.loading}
                        onClick={() => this.attemptLogin()}
                    >
                        <FeatherIcon icon="arrow-right" />
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

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ loginAction }, dispatch)
}

export default connect(null, mapDispatchToProps)(Form = withToastManager(withRouter(Form)));

const StyledOr = styled.span`
    text-align: center;
    display: block;
    min-width: 100%;
    margin: 0.5rem 0;
    font-size: 0.7rem;
    font-weight: 800;
`
