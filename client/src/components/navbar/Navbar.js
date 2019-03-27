import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Navbar extends Component {

    renderNavbar() {
        if (!this.props.created) {
            return null;
        }

        return <nav>nav</nav>
    }

    render() {
        return this.renderNavbar();
    }
}

const mapStateToProps = ({ 
    profile: { avatar, name, created }
}) => ({ avatar, name, created });

export default connect(mapStateToProps, null)(Navbar);