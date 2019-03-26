import styled, { keyframes } from 'styled-components';
 
export const rotateSquareRight = keyframes`
  0% {
    transform: rotate(-40deg);
  }
  100% {
    transform: rotate(10deg);
  }
`;

export const rotateSquareLeft = keyframes`
  0% {
    transform: rotate(60deg);
  }
  100% {
    transform: rotate(10deg);
  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;