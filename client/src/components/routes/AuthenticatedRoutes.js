import React, { Fragment } from 'react'
import { Route, Redirect } from "react-router-dom";

import Handle from '../handle/Handle';
import LoadProfile from '../dataFetch/LoadProfile';

const redirLogin = () => <Redirect to="/" />

const AuthenticatedRoutes = () => (
    <Fragment>
        <Route exact path="/" component={Handle} />
        <Route exact path="/login" component={redirLogin} />
        <Route exact path="/load_profile" component={LoadProfile} /> 
    </Fragment>
);

export default AuthenticatedRoutes;