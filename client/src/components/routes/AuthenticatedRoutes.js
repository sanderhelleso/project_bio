import React, { Fragment } from 'react'
import { Route, Redirect } from "react-router-dom";

import Handle from '../handle/Handle';
import Profile from '../profile/Profile';

const redirLogin = () => <Redirect to="/" />

const AuthenticatedRoutes = () => (
    <Fragment>
        <Route exact path="/" component={Handle} />
        <Route exact path="/login" component={redirLogin} />
        <Route exact path="/profile" component={Profile} /> 
    </Fragment>
);

export default AuthenticatedRoutes;