import styled, { keyframes } from 'styled-components';
 
export const zoomIn = keyframes`
0% {
    transform: scale(0.3);
  }
  100% {
    transform: rotate(1);
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