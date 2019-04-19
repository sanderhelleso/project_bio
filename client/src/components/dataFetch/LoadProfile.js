import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { fetchProfile } from '../../api/profile/profile';

class LoadProfile extends Component {

    async componentDidMount() {
        const response = await fetchProfile();

        this.props.history.push(
            response.status < 400 
            ? '/'
            : '/profile'
        )

        console.log(response);
    }

    render = () => <p>Loading...</p>;
}

export default withRouter(LoadProfile);
