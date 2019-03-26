import React, { Component } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import FeatherIcon from 'feather-icons-react';


class UploadAvatar extends Component {

    render() {
        return (
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                    <StyledUpload {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div>
                            <FeatherIcon icon="upload" />
                            <p>Click or drag</p>
                        </div>
                    </StyledUpload>
                )}
            </Dropzone>
        )
    }
}

export default UploadAvatar;

const StyledUpload = styled.div`
    border-radius: 4px;
    min-width: 250px;
    min-height: 250px;
    max-width: 250px;
    max-height: 250px;
    background-color: #eeeeee;
    margin: 2rem auto;
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
