import React from 'react';
import styled from 'styled-components';

const ProfileDetails = ({ handle, name, bio }) => {
	return (
		<StyledInfoCont>
			<span>{name}</span>
			<h5>{handle}</h5>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta pharetra.Lorem ipsum dolor sit
				amet, consectetur adipiscing elit. Vestibulum porta.
			</p>
		</StyledInfoCont>
	);
};

export default ProfileDetails;

const StyledInfoCont = styled.div`
	padding-top: 0.75rem;

	h5 {
		margin: 0;
		font-size: 1.2rem;
		font-weight: 600;
	}

	span {
		font-size: 0.95rem;
		opacity: 0.7;
	}

	p {
		font-size: 0.7rem;
		margin-top: 1.25rem;
		margin-bottom: 0;
	}
`;
