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
				<Menu />
			</Nav>
		);
	};

	return renderNavbar();
};

const mapStateToProps = ({ profile: { created } }) => ({ created });

export default connect(mapStateToProps, null)(Navbar);
