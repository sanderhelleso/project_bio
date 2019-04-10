import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FeatherIcons from 'feather-icons-react';

import { connect } from 'react-redux';

const CurrentlyWatching = ({ promoID }) => {
	const [ watching, setwatching ] = useState(0);
	const [ close, setclose ] = useState(false);

	useEffect(() => {
		// Establish a new socket connection for the currently watching promo
		const socket = new WebSocket(`ws://localhost:5000/sockets/promos/${promoID}`);
		console.log('Attempting to connect to socket...');

		socket.onmessage = (e) => {
			const data = JSON.parse(e.data);
			setwatching(data.body - 1); // -1 to exclude current users connection
		};

		socket.onerror = (err) => console.log('Socket error: ', err);
	}, []);

	const renderWatching = () => {
		if (!watching || close) return null;

		return (
			<StyledCont className="no-select">
				<span onClick={() => setclose(true)}>
					<FeatherIcons icon="x" />
				</span>
				🔥 {watching} other{watching === 1 ? ' is' : 's are'} also watching this
			</StyledCont>
		);
	};

	return renderWatching();
};

const mapStateToProps = ({ promos: { viewing: { promo: { ID } } } }) => {
	return { promoID: ID };
};

export default connect(mapStateToProps, null)(CurrentlyWatching);

const StyledCont = styled.div`
	position: fixed;
	bottom: 2rem;
	left: 2rem;
	background-color: #fff3e0;
	border-radius: 4px;
	min-height: 50px;
	min-width: 175px;
	z-index: 1000;
	padding: 1rem;
	padding-right: 1.75rem;
	font-size: 0.8rem;
	box-shadow: 0px 7.5px 15px rgba(0, 0, 0, 0.1);
	font-weight: 400;
	letter-spacing: 1px;
	border: 1.5px solid #ffcc80;

	svg {
		position: absolute;
		right: 5px;
		top: 36.5%;
		height: 0.9rem;
		widows: 0.9rem;
		cursor: pointer;
	}

	@media screen and (max-width: 475px) {
		left: 50%;
		transform: translate(-50%);
		min-width: 80%;
		bottom: 1rem;
	}

	@media screen and (max-width: 330px) {
		min-width: 95%;
	}
`;
