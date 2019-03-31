import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Container from '../styles/Container';
import NewProfile from './NewProfile';
import NewAvatar from './NewAvatar';


class Profile extends Component {
    state = {
        new: !this.props.profile.created,
    }

    componentWillReceiveProps() {
        window.scrollTo(0, 0);
    }

    renderProfile() {

        //return <NewAvatar />

        if (this.state.new && this.props.profile.created) {
            return <NewAvatar />
        }

        if (this.state.new) {
            return <NewProfile profile={this.props.profile} />
        }

        return <p> You have a profile!!!</p>
    }

    render() {
        return (
            <Container>
                {this.renderProfile()}
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return { profile: state.profile };
}

export default connect(mapStateToProps, null)(Profile);