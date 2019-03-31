import React from 'react';
import styled from 'styled-components';
import blobToSrc from '../../../lib/blobToSrc';
import { fadeIn } from '../../styles/Keyframes';

const Preview = ({ image, name, brand }) => (
    <StyledPreview>
        <div>
            <img src={blobToSrc(image.get('promo'))} alt="preview" />
        </div>
        <div id="info">
            <span id="brand-tag">{brand}</span>
            <h5>{name}</h5>
        </div>
    </StyledPreview>
);

export default Preview;

const StyledPreview = styled.div`
    min-height: 5rem;
    max-height: 5rem;
    min-width: 100%;
    background-color: #ffffff;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.05);
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    animation: ${fadeIn};
    display: grid;
    grid-template-columns: 25% 75%;

    &:hover {
        box-shadow: 0px 10px 22px rgba(0,0,0,0.1);
    }

    img {
        max-width: 100%;
        min-width: 100%;
        min-height: 98%;
        max-height: 98%;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-right: 0.5px solid #eeeeee;
    }

    div {
        max-height: 100%;
    }

    #info {

        margin-top: 0.5rem;
        margin-left: 1rem;

        h5 {
            margin-top: 0.45rem;
            margin-left: 0.15rem;
        }

        #name-tag {
            text-transform: uppercase;
            font-size: 0.7rem;
            color: #9e9e9e;
            letter-spacing: 1px;
        }

        #brand-tag {
            border-radius: 20px;
            background-color: #e3f2fd;
            font-size: 0.7rem;
            padding: 1.5px 8.5px;            
        }
    }
`;