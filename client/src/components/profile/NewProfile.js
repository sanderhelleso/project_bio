import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';
import { withToastManager } from 'react-toast-notifications';

import Container from '../styles/Container';
import { Inputs, Input } from '../styles/Input';
import { Button } from '../styles/Button';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import setProfileAction from '../../actions/profileActions/setProfileAction';

import { createProfile } from '../../api/profile/profile';

class NewProfile extends Component {
    state = {
        loading: false,
        profile: this.props.profile,
        fields: [
            {
                placeholder: '@yourhandle',
                maxLength: 30,
                name: 'handle'
            },
            {
                placeholder: 'What is your name?',
                maxLength: 70,
                name: 'name'
            },
            {
                placeholder: 'Tell us about yourself, what do you promote?',
                maxLength: 150,
                name: 'bio'
            },
            {
                placeholder: 'Got an Instagram account? Share it!',
                maxLength: false,
                name: 'instagramURL'
            }
        ]
    };


    saveFormState = () => {
        this.props.setProfileAction(this.state.profile)
    }

    componentWillUnmount() {

        // save form state to store on page exit / unmount
        this.componentCleanup();
        window.removeEventListener('beforeunload', this.saveFormState);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.saveFormState);
    }


    handleChange = (e, maxLength) => {
        if (e.target.value.length <= maxLength || !maxLength) {
            this.setState({ 
                profile: {
                    ...this.state.profile,
                    [e.target.name]: e.target.value
                }
            });
        }
    }

    attemptCreateProfile = async () => {
        this.setState({ loading: true });

        const response = await createProfile(this.state.profile);

        // display notification status
        const { toastManager } = this.props;
        toastManager.add(response.message, {
            appearance: response.status < 400 ? 'success' : 'error',
            autoDismiss: response.status < 400
        });

        this.setState({ loading: false });
    }

    renderFields() {
        return this.state.fields.map(field => {
            return (
                <Fragment key={field.name}>
                    <Input 
                        type="text" 
                        name={field.name}
                        placeholder={field.placeholder}
                        value={this.state.profile[field.name]}
                        onChange={e => this.handleChange(e, field.maxLength)} 
                    />
                    {field.maxLength 
                        ? <StyledLabel>
                            {this.state.profile[field.name].length} / {field.maxLength}
                        </StyledLabel>
                        : null
                    }
                </Fragment>
            )
        })
    }

    render() {
        return (
            <Container>
                <StyledCont>
                    <StyledShape />
                    <h1>New Profile</h1>
                    <Inputs stack={true} stretch={true}>
                        {this.renderFields()}
                    </Inputs>
                    <Button
                        disabled={this.state.loading}
                        onClick={() => this.attemptCreateProfile()}
                    >
                        <FeatherIcon icon="arrow-right" />
                        Create profile
                    </Button>
                    <a>Need help?</a>
                </StyledCont>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ setProfileAction }, dispatch);
}


export default connect(null, mapDispatchToProps)(NewProfile = withToastManager(NewProfile));

const StyledCont = styled.div`
    max-width: 500px;
    margin: 7.5rem auto;
    text-align: center;
    position: relative;

    h1 {
        font-size: 3rem;
        color: ${props => props.theme.primaryText};
        margin-top: 0;
    }


    button {
        margin: 3rem auto 1rem auto;
        position: relative;

        svg {
            height: 1rem;
            width: 1rem;
            opacity: 0.5;
            position: absolute;
            right: 10%;
            top: 35%;
        }
    }

    a {
        font-size: 0.9rem;
        color: #9e9e9e;
        display: block;
        margin-top: 1rem;
        cursor: pointer;
    }
`;

const StyledLabel = styled.span`
    display: block;
    float: right;
    margin: 0.5rem 0 2rem 0;
    font-size: 0.7rem;
    color: #9e9e9e;
`;

const StyledShape = styled.span`
    background: #9796f0;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #fbc7d4, #9796f0);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #fbc7d4, #9796f0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border-radius: 66% 34% 29% 71% / 38% 46% 54% 62%;
    min-height: 20rem;
    min-width: 20rem;
    display: block;
    position: absolute;
    top: -7.5%;
    left: -25%;
    z-index: -1;
    opacity: 0.5;
`
