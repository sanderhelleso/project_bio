import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import FeatherIcon from 'feather-icons-react';
import { Button, FlatButton, Buttons } from '../../../styles/Button';
import blobToSrc from '../../../../lib/blobToSrc';

class UploadPromoImage extends Component {
    state = { preview: null };

    componentWillReceiveProps(nextProps) {
        if (nextProps.reset) {
            this.setState({ preview: null });
        }
    }

    renderUploadState(isDragActive, isDragReject) {
        
        let message = 'Drop or drag an image of product';

        if (isDragActive && !isDragReject) {
            message = "Drop it like it's hot!";
        }

        else if (isDragReject) {
            message = 'File type not allowed';
        }

        return (
            <div>
                <FeatherIcon icon="upload" />
                <p>{message}</p>
            </div>
        )
    }

    handleFile = file => {
        const data = new FormData();

        // set preview
        data.append('promo', file[0], file.name);
        this.setPreview(file);

        // pass blob to parent
        this.props.handleFile(data);
    }

    setPreview(file) {
        this.clearPreview();

        // set new preview
        this.setState({ preview: blobToSrc(file[0]) });
    }

    clearPreview() {

        // clear old file preview
        window.URL.revokeObjectURL(this.state.preview);

        // update file state for current product
        this.setState({ preview: null });
        this.props.handleFile(null)
    }

    renderClear() {
        
        if (!this.state.preview) {
            return null;
        }

        return (
            <StyledClearImage onClick={() => this.clearPreview()}>
                <FeatherIcon icon="trash" />
                Clear Image
            </StyledClearImage>
        );
    }
 
    render() {
        return (
            <StyledCont>
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
                            {
                                this.state.preview
                                ? <img src={this.state.preview} />
                                : this.renderUploadState(isDragActive, isDragReject)
                                
                            }
                        </StyledUpload>
                    )}
                </Dropzone>
                {this.renderClear()}
            </StyledCont>
        )
    }
}

export default UploadPromoImage;

const StyledCont = styled.div`
    text-align: center;

    a {
        margin-top: 4rem;
    }
`;

const StyledClearImage = styled.a`
    min-width: 100%;
    cursor: pointer;

    svg {
        height: 1.25rem;
        width: 1.25rem;
        margin-right: 0.5rem;
        margin-bottom: -2.5px;
        stroke: #ff1744;
        opacity: 0.5;
    }
`;

const StyledUpload = styled.div`
    border-radius: 4px;
    min-height: 25rem;
    min-width: 20rem;
    max-height: 25rem;
    max-width: 20rem;
    background-color: #eeeeee;
    margin: 2rem auto;
    border: 2px solid #e0e0e0;
    outline: none;
    position: relative;
    cursor: pointer;
    text-align: center;

    img {
        border-radius: 4px;
        min-width: 20rem;
        min-height: 25rem;
        max-width: 20rem;
        max-height: 25rem;
        transform: scale(1.025);
        transition: 0.3s ease-in-out;
    }

    div {
        position: absolute;
        top: 37.5%;
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