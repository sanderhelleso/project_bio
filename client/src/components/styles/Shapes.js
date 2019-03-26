import styled from 'styled-components';
import { rotateSquareRight, rotateSquareLeft } from './Keyframes';

const defaultStyle = `
    z-index: -1;
    opacity: 0.5;
    min-height: 25rem;
    min-width: 25rem;
    display: block;
    position: absolute;
`;

export const ShapeSquareRightWithBorder = styled.span`
    ${defaultStyle}
    top: -3.5%;
    right: -35%;
    border: 15px solid #eeeeee;
    animation: ${rotateSquareRight} 0.8s ease-in-out forwards;
`;

export const ShapeSquareLeft = styled.span`
    ${defaultStyle}
    z-index: -1;
    top: -3.5%;
    left: -35%;
    background-color: #eeeeee;
    animation: ${rotateSquareLeft} 0.8s ease-in-out forwards;
`;