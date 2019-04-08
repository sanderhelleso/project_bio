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
	margin-bottom: 3rem;
	padding: 4rem;
	word-break: break-all;

	textarea {
		font-size: 0.9rem;
		padding: 8px;
		min-width: 100%;
		min-height: 100px;
		resize: none;
	}

	@media screen and (max-width: 1050px) {
		padding: 2rem;
	}

	@media screen and (max-width: 1000px) {
		padding: 4rem;
	}

	@media screen and (max-width: 600px) {
		padding: 2rem;
	}
`;

export const PreviewsCardSingle = styled.div`
	${cardStyles};
	grid-area: adds;
	padding: 4rem;
	word-break: break-all;

	@media screen and (max-width: 1050px) {
		padding: 2rem;
	}

	@media screen and (max-width: 1000px) {
		padding: 4rem;
	}
`;

export const PreviewCard = styled.div`
	margin: 4rem 0;
	position: relative;
	min-height: 325px;

	button {
		float: right;
		margin-top: 1.5rem;

		@media screen and (max-width: 1300px) {
			float: none;
			clear: both;
			min-width: 100%;
			margin: 7rem auto 3.5rem auto;
		}
	}

	border-bottom: 1px solid #eeeeee;
`;
