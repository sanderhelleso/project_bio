import React from 'react';

import { connect } from 'react-redux';

import { Nav } from '../styles/Nav';
import Menu from './Menu';
import Logo from './Logo';

const Navbar = ({ created, avatar, handle }) => {
	const renderNavbar = () => {
		if (!created) {
			return null;
		}

		return (
			<Nav>
				<Logo />
				<Menu avatar={avatar} handle={handle} />
			</Nav>
		);
	};

	return renderNavbar();
};

const mapStateToProps = ({ profile: { avatar, handle, created } }) => ({ avatar, handle, created });

export default connect(mapStateToProps, null)(Navbar);
