import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NewProfile from '../profile/NewProfile';


class Profile extends Component {
    state = {
        new: this.props.profile.created
    }

    renderProfile() {

        if (!this.state.new) {
            return <NewProfile profile={this.props.profile} />
        }
    }

    render() {
        return this.renderProfile();
    }
}

const mapStateToProps = state => {
    return { profile: state.profile };
}

export default connect(mapStateToProps, null)(Profile);