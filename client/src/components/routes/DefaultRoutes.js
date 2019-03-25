import React, { Fragment } from 'react'
import { Route } from "react-router-dom";

import Login from '../login/Login';
import Landing from '../landing/Landing';

const DefaultRoutes = () => (
    <Fragment>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
    </Fragment>
)

export default DefaultRoutes;