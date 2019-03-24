import React, { Component } from 'react';
import { login } from '../../api/login/login';

class Form extends Component {
    state = {
        email: 'johndoe@gmail.com',
        password: 'Randompass123',
        loading: false
    }

    async componentDidMount() {
        //const response = await login(this.state.email, this.state.password);
        //console.log(response);
    }


    render() {
        return <h5>Im a form</h5>
    }
}

export default Form;