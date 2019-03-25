import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { fetchProfile } from '../../api/profile/profile';

class Handle extends Component {
    state = {
        loading: true
    }

    async componentDidMount() {
        const response = await fetchProfile();
        console.log(response);
        this.setState({ loading: false })
    }

   render() {
       return(
            <div>
                <h1>My Handle</h1>
                {this.state.loading ? <p>Loading...</p> : null}
            </div>
       )
   }
}

export default withRouter(Handle);