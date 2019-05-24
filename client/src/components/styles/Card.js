import styled from 'styled-components';
import { fadeIn } from './Keyframes';

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

const handleCardStyles = `
	padding: 3rem;
`;

export const mainGridStyles = `
	display: grid;
	grid-row-gap: 4rem;
	grid-column-gap: 3rem;
	margin-bottom: 3rem;
	min-height: 90vh;
	margin-top: 5rem;
	margin-bottom: 5rem;
`;

export const PromoCardSingle = styled.div`
	${cardStyles};
	${promoCardStyles};
	position: relative;
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
	padding: 4rem;
	word-break: break-all;
	display: block;

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
		display: block;
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

	@media screen and (max-width: 600px) {
		padding: 3rem;
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

	@media screen and (max-width: 1000px) {
		margin: 1rem 0;
		padding-bottom: 1.75rem;
	}

	border-bottom: 1px solid #eeeeee;
`;

export const HandleProfileCard = styled.div`
	${cardStyles};
	${handleCardStyles};
	padding-bottom: 1.75rem;
	display: grid;
	grid-area: profile;
`;

export const HandleRecentPromoCard = styled.div`
	${cardStyles};
	${handleCardStyles};
	display: grid;
	grid-area: recentPromo;
`;

export const HandleSeeMorePromosCard = styled.div`
	${cardStyles};
	${handleCardStyles};
	display: grid;
	grid-area: seeMorePromos;
`;

export const HandlePromoCard = styled.div`
	${cardStyles};
	animation: ${fadeIn} 0.6s ease-in-out;

	display: grid;
	grid-template-columns: minmax(0, 1fr);
`;
