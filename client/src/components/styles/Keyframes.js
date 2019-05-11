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

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const load = keyframes`
  0% {
    opacity: 1;
  }

  10% {
    opacity: 0.85;
  }

  20% {
    opacity: 0.70;
  }

  30% {
    opacity: 0.55;
  }

  40% {
    opacity: 0.40;
  }

  50% {
    opacity: 0.25;
  }

  60% {
    opacity: 0.40;
  }

  70% {
    opacity: 0.55;
  }

  80% {
    opacity: 0.70;
  }

  90% {
    opacity: 0.85;
  }

  100% {
    opacity: 1;
  }
`;
