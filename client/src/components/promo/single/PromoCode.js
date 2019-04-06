import React, { Fragment, useReducer } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const PromoCode = ({ code }) => {
	const [ state, updateState ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		tooltip: 'Click to Copy 👉'
	});

	const { tooltip } = state;

	const copyToClipboard = () => {
		updateState({ tooltip: 'Copied! 👌' });
		ReactTooltip.rebuild();

		setTimeout(() => {
			updateState({ tooltip: 'Click to Copy 👆' });
		}, 1500);
	};

	return (
		<Fragment>
			<StyledCode data-tip={tooltip} onClick={copyToClipboard} className="no-select">
				KAFFI20
			</StyledCode>
			<Tooltip place="bottom" type="dark" effect="solid" getContent={() => tooltip} />
		</Fragment>
	);
};

export default PromoCode;

const StyledCode = styled.span`
	text-align: center;
	display: inline-block;
	padding: 0.5rem 1.5rem;
	border-radius: 4px;
	background-color: #12e2a3;
	color: #ffffff;
	letter-spacing: 2px;
	cursor: pointer;
`;

const Tooltip = styled(ReactTooltip)`
	text-align: center !important;
	min-width: 150px !important;
`;
