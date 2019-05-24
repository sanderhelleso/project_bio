import React, { Fragment } from 'react';
import styled from 'styled-components';

const HandleLoader = () => {
	return (
		<Fragment>
			<StyledLoader1 className="load1 loader" />
			<StyledLoader2 className="load2 loader" />
			<StyledLoader3 className="load3 loader" />
		</Fragment>
	);
};

export default HandleLoader;

const StyledLoader1 = styled.div`
	.load1 {
		grid-area: recentPromo;
	}
`;

const StyledLoader2 = styled.div`
	.load2 {
		grid-area: profile;
	}
`;

const StyledLoader3 = styled.div`
	.load3 {
		grid-area: seeMorePromos;
	}
`;
