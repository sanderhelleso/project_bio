import styled from 'styled-components';
import { fadeIn } from './Keyframes';

export default styled.div`
	max-width: ${(props) => props.max || 75}%;

	@media screen and (min-width: 1800px) {
		max-width: 65%;
	}

	@media screen and (max-width: 1000px) {
		max-width: 85%;
	}

	@media screen and (max-width: 600px) {
		max-width: 90%;
	}

	margin: 0 auto;
	animation: ${fadeIn} 0.7s ease-in-out;
`;
