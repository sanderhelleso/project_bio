import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from '../login/Login';
import Signup from '../signup/Signup';
import Landing from '../landing/Landing';

const Routes = () => (
    <Router>
        <Fragment>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
        </Fragment>
    </Router>
)

export default Routes;
