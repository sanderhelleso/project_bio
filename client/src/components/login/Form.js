import React, { Component } from 'react';
import { login } from '../../api/login/login';
import { Button, Buttons, Instagram, } from '../styles/Button';
import { Inputs, Input } from '../styles/Input';
import FeatherIcon from 'feather-icons-react';

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
        return (
            <form>
                <Inputs stack={true} stretch={true}>
                    <Input placeholder="E-Mail address" type="email" />
                    <Input placeholder="Password" type="password" />
                </Inputs>
               <Buttons stretch={true}>
                    <Button>Submit</Button>
                    <Instagram>
                        <span>
                            <FeatherIcon icon="instagram" />
                        </span>
                        Instagram
                    </Instagram>
                </Buttons>
            </form>
        )
    }
}

export default Form;
