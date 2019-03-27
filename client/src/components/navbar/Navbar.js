import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Nav } from '../styles/Nav';
import Menu from './Menu';

class Navbar extends Component {

    renderNavbar() {
        if (!this.props.created) {
            return null;
        }

        return (
            <Nav>
                <Menu 
                    avatar={this.props.avatar} 
                    name={this.props.name} 
                />
            </Nav>
        )
    }

    render() {
        return this.renderNavbar();
    }
}

const mapStateToProps = ({ 
    profile: { avatar, name, created }
}) => ({ avatar, name, created });

export default connect(mapStateToProps, null)(Navbar);