import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PreviewsCardSingle } from '../../styles/Card';
import Preview from './Preview';

import { findRecomendations } from '../../../api/promo/recomendation';

const PreviewsCard = () => {
	const [ loading, setLoading ] = useState(true);
	const [ recomendations, setRecomendations ] = useState([]);

	useEffect(() => {
		loadRecomendations();
	}, []);

	// attempt to find recomendations based on the users
	// preivious viewed promotion history
	const loadRecomendations = async () => {
		const response = await findRecomendations();
		if (response.status < 400) {
			// todo...
		}

		console.log(response);
		setLoading(false);
	};

	const renderRecommendations = () => {
		if (loading) return <p>Loading...</p>;
		if (!recomendations.length) return null;

		return recomendations.map((rec, i) => <Preview key={i} />);
	};

	return (
		<PreviewsCardSingle>
			<StyledHeader>
				<h2>Similar promotions</h2>
			</StyledHeader>
			<StyledCont>
				{renderRecommendations()}
				<Preview />
				<Preview />
				<Preview />
				<Preview />
				<Preview />
			</StyledCont>
		</PreviewsCardSingle>
	);
};

export default PreviewsCard;

const StyledHeader = styled.div`
	margin-bottom: 4rem;
	h2 {
		font-weight: 100;
		font-size: 1.5rem;
		color: #9e9e9e;
	}
`;

const StyledCont = styled.div`
	min-height: 100%;
	position: relative;

	@media screen and (max-width: 1000px) {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 3rem;
	}

	@media screen and (max-width: 600px) {
		grid-template-columns: 1fr;
	}
`;
