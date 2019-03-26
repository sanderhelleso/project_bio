import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { fetchProfile } from '../../api/profile/profile';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import setProfileAction from '../../actions/profileActions/setProfileAction';

class Handle extends Component {
    state = {
        loading: true
    }

    async componentDidMount() {

        if (this.props.profile.created) {
            return this.setState({ loading: false });
        }

        const response = await fetchProfile();
        console.log(response);

        if (response.status < 400) {
            this.props.setProfileAction({
                ...response.payload.profile,
                created: true
            });

            return this.setState({ loading: false })
        }

        // if user has a profile, set profile,
        // if not, render create profile
        this.props.history.push('/profile');
    }

    renderProfile() {

       if (!this.state.loading && this.props.profile.created) {
            return <p>You have a profile!!</p>
        }

        return <p>Loading...</p>
    }

   render() {
       return(
            <div>
                {this.renderProfile()}
            </div>
       )
   }
}

const mapStateToProps = state => {
    return { profile: state.profile };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ setProfileAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Handle));