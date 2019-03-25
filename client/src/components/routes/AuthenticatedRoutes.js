import React, { Fragment } from 'react'
import { Route, Redirect } from "react-router-dom";

import Handle from '../handle/Handle';

const redirLogin = () => <Redirect to="/" />

const AuthenticatedRoutes = () => (
    <Fragment>
        <Route exact path="/" component={Handle} />
        <Route exact path="/login" component={redirLogin} />
    </Fragment>
);

export default AuthenticatedRoutes;