import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import styled from 'styled-components';
import { Button } from '../styles/Button';


class NewAvatar extends Component {
    state = {
        loading: false
    }

    skipUpload = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <StyledCont>
                <h1>Upload your photo</h1>
                <p>...or dont, anyway is cool</p>
                <StyledImg />
                <Button>Upload</Button>
                <a onClick={() => this.skipUpload()}>
                    Skip
                </a>
            </StyledCont>
        )
    }
}

export default withRouter(NewAvatar);

const StyledCont = styled.div`
    max-width: 500px;
    margin: 12.5vh auto;
    text-align: center;

    button {
        display: block;
        margin: 1rem auto;
    }

    a {
        font-size: 0.9rem;
        color: #9e9e9e;
        display: block;
        margin-top: 2rem;
        cursor: pointer;
    }
`;

const StyledImg = styled.img`
    border-radius: 4px;
    min-width: 250px;
    min-height: 250px;
    max-width: 250px;
    max-height: 250px;
    background-color: #eeeeee;
    margin: 2rem auto;
`;

