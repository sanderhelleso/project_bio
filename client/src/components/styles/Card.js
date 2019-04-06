import styled from 'styled-components';

const cardStyles = `
    box-shadow: 0px 5px 10px rgba(0,0,0,0.05);
    border-radius: 4px;
    background-color: #ffffff;
`;

export const PromoCardSingle = styled.div`
	${cardStyles};
	min-width: 85%;
	max-width: 900px;
	min-height: 400px;
	margin: 5rem auto;
	display: grid;
	grid-template-columns: 30% 55% 15%;
`;
