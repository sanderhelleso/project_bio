import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import styled from 'styled-components';
import { Button } from '../styles/Button';
import  { uploadAvatar } from '../../api/profile/profile';
import FeatherIcon from 'feather-icons-react';
import { withToastManager } from 'react-toast-notifications';

import { fadeIn } from '../styles/Keyframes';
import UploadAvatar from './UploadAvatar';
import { zoomIn } from '../styles/Keyframes';


class NewAvatar extends Component {
    state = {
        loading: false,
        file: null
    }

    skipUpload = () => {
        this.props.history.push('/');
    }

    handleFile = file => {
        this.setState({ file });
    }

    uploadFile = async () => {
        const { toastManager } = this.props;

        if (!this.state.file) {
            return this.errorAlert(toastManager);
        }

        this.setState({ loading: true });

        const response = await uploadAvatar(this.state.file);

        // display notification status
        toastManager.add(response.message, {
            appearance: response.status < 400 ? 'success' : 'error',
            autoDismiss: true
        });

        if (response.status < 400) {
            return this.props.history.push('/');
        }

        this.setState({ loading: false });
    }

    errorAlert(toastManager) {
        toastManager.add('Please select an image', {
            appearance: 'error',
            autoDismiss: true
        });
    }

    render() {
        return (
            <StyledCont>
                <h1>Upload your photo</h1>
                <p>...or dont, anyway is cool</p>
                <UploadAvatar handleFile={this.handleFile} />
                <Button 
                    disabled={this.state.loading}
                    onClick={() => this.uploadFile()}
                >
                    {this.state.file && <FeatherIcon icon="upload" />}
                    Upload
                </Button>
                <a onClick={() => this.skipUpload()}>
                    Skip
                </a>
            </StyledCont>
        )
    }
}

export default withToastManager(withRouter(NewAvatar));

const StyledCont = styled.div`
    max-width: 500px;
    margin: 12.5vh auto;
    text-align: center;
    animation: ${fadeIn} 0.5s ease-in-out;

    button {
        display: block;
        margin: 1rem auto;
        
        svg {
            animation: ${zoomIn} 0.2s ease-in-out forwards;
        }
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

