import React, { Component } from 'react';
import { fetchProfile } from '../../api/profile/profile';

class LoadProfile extends Component {

    async componentDidMount() {
        const response = await fetchProfile();
        console.log(response);
    }

    render = () => <p>Loding...</p>;
}

export default LoadProfile;