import React, { useState } from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';
import FeaterIcons from 'feather-icons-react';
import Options from './Options';
import { fadeIn } from '../styles/Keyframes';

import { connect } from 'react-redux';

const Menu = ({ avatar, handle }) => {
	const [ active, modifyMenu ] = useState(false);

	const renderMenu = () => {
		if (active) {
			return <Options />;
		}

		return null;
	};

	return (
		<StyledMenu>
			<div id="menu-cont">
				<Avatar source={avatar} handle={handle} />
				<div id="inner">
					<p>{handle}</p>
					<span onClick={() => modifyMenu(!active)}>
						<FeaterIcons icon={!active ? 'chevron-down' : 'x'} />
					</span>
				</div>
			</div>
			{renderMenu()}
		</StyledMenu>
	);
};

const mapStateToProps = ({ profile: { avatar, handle } }) => ({ avatar, handle });

export default connect(mapStateToProps, null)(Menu);

const StyledMenu = styled.div`
	min-width: 285px;
	max-width: 285px;
	min-height: 3.35rem;
	max-height: 3.35rem;
	background-color: #ffffff;
	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
	position: absolute;
	top: 1.25rem;
	right: 3rem;
	border-radius: 4px;
	animation: ${fadeIn} 0.1s ease-in-out;
	z-index: 10000;

	#menu-cont {
		display: flex;
		min-height: 3.35rem;
		max-height: 3.35rem;

		#inner {
			min-width: 75%;
		}

		p {
			color: black;
			font-size: 0.8rem;
			margin-top: 1rem;
			margin-left: 0.75rem;
			min-width: 75%;
			max-width: 75%;
			display: inline-block;
			font-weight: 400;
		}

		span {
			margin-top: 1rem;
			margin-right: 0.5rem;
			opacity: 0.7;
			float: right;
			cursor: pointer;

			svg {
				stroke: #9e9e9e;
				height: 1.35rem;
				width: 1.35rem;
			}
		}
	}
`;
