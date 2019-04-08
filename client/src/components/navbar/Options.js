import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../styles/Keyframes';
import FeaterIcons from 'feather-icons-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import logoutAction from '../../actions/userActions/logoutAction';
import { withRouter } from 'react-router-dom';

function renderOptions(props) {
	const options = [
		{
			title: 'My Promos',
			icon: 'package',
			action: () => console.log(123)
		},
		{
			title: 'Followers',
			icon: 'users',
			action: () => console.log(321)
		},
		{
			title: 'Profile',
			icon: 'edit-2',
			action: () => console.log(321)
		},
		{
			title: 'Logout',
			icon: 'log-out',
			action: () => {
				props.logoutAction();
				props.history.replace('/login');
			}
		}
	];

	return options.map((option) => {
		return (
			<li key={option.title} onClick={option.action}>
				{option.title}
				<FeaterIcons icon={option.icon} />
			</li>
		);
	});
}

const Options = (props) => <StyledOptions>{renderOptions(props)}</StyledOptions>;

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ logoutAction }, dispatch);
};

export default connect(null, mapDispatchToProps)(withRouter(Options));

const StyledOptions = styled.ul`
	min-width: 100%;
	display: block;
	background-color: #ffffff;
	list-style: none;
	padding: 1rem;
	margin-top: -2.5px;
	bottom: 0;
	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
	border-top: 0.5px solid #eeeeee;
	animation: ${fadeIn} 0.5s ease-in-out;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;

	li {
		font-size: 0.9rem;
		padding: 0.5rem 0;
		margin-top: 0.5rem;
		cursor: pointer;
		text-transform: uppercase;
		letter-spacing: 2px;
		position: relative;
		opacity: 0.7;
		transition: 0.3s ease-in-out;

		&:hover {
			opacity: 1;
			svg {
				stroke: ${(props) => props.theme.secondaryColor};
			}
		}

		svg {
			position: absolute;
			top: 20%;
			right: -2.5px;
			stroke: #82acff;
			opacity: 0.7;
			height: 1.20rem;
			widows: 1.20rem;
			transition: 0.3s ease-in-out;
		}
	}
`;
