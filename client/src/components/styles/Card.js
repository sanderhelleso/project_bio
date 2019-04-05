import styled from 'styled-components';

const cardStyles = `
    box-shadow: 0px 5px 10px rgba(0,0,0,0.05);
    border-radius: 4px;
    background-color: #ffffff;
    margin: 5rem auto;
    display: grid;
    grid-template-columns: 30% 70%;
`;

export const PromoCardSingle = styled.div`
	min-width: 75%;
	max-width: 900px;
	min-height: 400px;
	max-height: 400px;
	${cardStyles};
`;
