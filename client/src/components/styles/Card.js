import styled from 'styled-components';

const cardStyles = `
    box-shadow: 0px 7.5px 15px rgba(0,0,0,0.1);
    border-radius: 4px;
	background-color: #ffffff;
`;

const promoCardStyles = `
	min-height: 400px;
	display: grid;
	padding: 2rem 0;
`;

export const PromoCardSingle = styled.div`
	${cardStyles};
	${promoCardStyles};
	margin-top: 5rem;
	margin-bottom: 3rem;
	grid-area: promo;
	grid-template-columns: 30% 55% 15%;
	grid-template-areas: "image info options";

	@media screen and (max-width: 1100px) {
		padding: 2rem 3rem;
		grid-template-columns: 45% 55%;

		/* prettier-ignore */
		grid-template-areas:
			"info info"
			"options image"
		;

		padding-bottom: 2rem;
	}

	@media screen and (max-width: 600px) {
		padding: 1.25rem;

		/* prettier-ignore */
		grid-template-areas:
			"info info"
			"options options"
			"image image" 
		;
	}
`;

export const CommentsCard = styled.div`
	${cardStyles};
	${promoCardStyles};
	grid-area: comments;
	margin-bottom: 5rem;
	padding: 4rem;
`;

export const AddsCard = styled.div`
	${cardStyles};
	${promoCardStyles};
	grid-area: adds;
	margin-bottom: 5rem;
	padding: 4rem;
`;
