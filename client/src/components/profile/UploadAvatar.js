import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import FeatherIcon from 'feather-icons-react';
import { withToastManager } from 'react-toast-notifications';

import  { uploadAvatar } from '../../api/profile/profile';


class UploadAvatar extends Component {

    renderUploadState(isDragActive, isDragReject) {
        
        let message = 'Drop or drag';

        if (isDragActive && !isDragReject) {
            message = "Drop it like it's hot!";
        }

        else if (isDragReject) {
            message = 'File type not allowed';
        }

        return <p>{message}</p>;
    }

    handleFile = async file => {
        const data = new FormData();
        data.append('avatar', file[0], file.name);
        
        const response = await uploadAvatar(data);

        // display notification status
        const { toastManager } = this.props;
        toastManager.add(response.message, {
             appearance: response.status < 400 ? 'success' : 'error',
             autoDismiss: true
        });

    }

    render() {
        return (
            <Dropzone 
                accept="image/png, image/jpeg"
                maxFiles={1}
                minSize={0}
                maxSize={1 << 20}
                onDrop={file => this.handleFile(file)}
            >
                {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                    <StyledUpload {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div>
                            <FeatherIcon icon="upload" />
                            {this.renderUploadState(isDragActive, isDragReject)}
                        </div>
                    </StyledUpload>
                )}
            </Dropzone>
        )
    }
}

export default withToastManager(UploadAvatar);

const StyledUpload = styled.div`
    border-radius: 4px;
    min-width: 250px;
    min-height: 250px;
    max-width: 250px;
    max-height: 250px;
    background-color: #eeeeee;
    margin: 3rem auto;
    border: 2px solid #e0e0e0;
    outline: none;
    position: relative;
    cursor: pointer;

    div {
        position: absolute;
        top: 32.5%;
        left: 50%;
        transform: translate(-50%);
        text-align: center;

        p {
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 0.8rem;
            margin-top: 1.5rem;
            opacity: 0.5;
        }
    }

    svg {
        height: 3rem;
        width: 3rem;
        stroke: #9e9e9e;
        opacity: 0.5;        
    }
`;
