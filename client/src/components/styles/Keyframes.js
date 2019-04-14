import { keyframes } from 'styled-components';

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

export const load = keyframes`
  0% {
    opacity: 1;
  }

  10% {
    opacity: 0.9;
  }

  20% {
    opacity: 0.8;
  }

  30% {
    opacity: 0.7;
  }

  40% {
    opacity: 0.6;
  }

  50% {
    opacity: 0.5;
  }

  60% {
    opacity: 0.6;
  }

  70% {
    opacity: 0.7;
  }

  80% {
    opacity: 0.8;
  }

  90% {
    opacity: 0.9;
  }

  100% {
    opacity: 1;
  }
`;
