import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import Container from '../styles/Container';
import { Inputs, Input } from '../styles/Input';
import { Button } from '../styles/Button';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import setProfileAction from '../../actions/profileActions/setProfileAction';

class NewProfile extends Component {
    state = {
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
                    <Inputs stack={true} stretch={true}>
                        {this.renderFields()}
                    </Inputs>
                    <Button>Create profile</Button>
                    <a>Need help?</a>
                </StyledCont>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ setProfileAction }, dispatch);
}


export default connect(null, mapDispatchToProps)(NewProfile);

const StyledCont = styled.div`
    max-width: 500px;
    margin: 7.5rem auto 0 auto;
    text-align: center;
    position: relative;

    h1 {
        font-size: 7rem;
        color: #eeeeee;
        font-weight: 800;
        z-index: -1;
        position: absolute;
        top: -17.5rem;
        left: -15rem;
    }


    button {
        margin: 3rem auto 1rem auto;
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
`
