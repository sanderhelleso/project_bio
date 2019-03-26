import React, { Component } from 'react';

class NewProfile extends Component {
    state = this.props; // Initial profile data

    componentDidMount() {
        console.log(this.state);
    }

    render() {
        return <p>New Profile...</p>
    }
}

export default NewProfile;