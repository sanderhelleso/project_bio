import React from 'react';
import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';
import ReactTooltip from 'react-tooltip';

const ModalShareAction = ({ props, icon }) => {
	const id = `${icon}-tooltip`;
	return (
		<StyledAction {...props}>
			<FeatherIcon icon={icon} data-tip={icon} data-for={id} />
			<Tooltip id={id} place="bottom" type="dark" effect="solid" />
		</StyledAction>
	);
};

export default ModalShareAction;

const StyledAction = styled.a`
	display: inline-block;
	svg {
		stroke: #9e9e9e;
		height: 3.05rem;
		width: 3.05rem;
		margin: 1.5rem;
		cursor: pointer;
		transition: 0.3s ease-in-out;

		&:hover {
			stroke: ${(props) => props.color};
		}
	}

	@media screen and (max-width: 600px) {
		display: block;
	}
`;

const Tooltip = styled(ReactTooltip)`
	text-align: center !important;
	min-width: 100px !important;
    text-transform: capitalize;
`;
