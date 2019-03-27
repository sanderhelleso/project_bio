import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Nav } from '../styles/Nav';
import Menu from './Menu';
import Logo from './Logo';

class Navbar extends Component {

    renderNavbar() {
        if (!this.props.created) {
            return null;
        }

        return (
            <Nav>
                <Logo />
                <Menu 
                    avatar={this.props.avatar} 
                    name={this.props.name}
                    handle={this.props.handle} 
                />
            </Nav>
        )
    }

    render() {
        return this.renderNavbar();
    }
}

const mapStateToProps = ({ 
    profile: { avatar, name, handle, created }
}) => ({ avatar, name, handle, created });

export default connect(mapStateToProps, null)(Navbar);