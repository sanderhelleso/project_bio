import React, { Fragment } from 'react'
import { Route, Redirect } from "react-router-dom";

import Profile from '../profile/Profile';
import Navbar from '../navbar/Navbar';
import Me from '../me/Me';

const redirHome = () => <Redirect to="/" />

const AuthenticatedRoutes = () => (
    <Fragment>
        <Route path="/" component={Navbar} />
        <Route exact path="/" component={Me} />
        <Route exact path="/login" component={redirHome} />
        <Route exact path="/profile" component={Profile} /> 
    </Fragment>
);

export default AuthenticatedRoutes;