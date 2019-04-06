import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../login/Login';
import Landing from '../landing/Landing';
import Handle from '../handle/Handle';

const DefaultRoutes = () => (
	<Switch>
		<Route exact path="/" component={Landing} />
		<Route exact path="/login" component={Login} />
		<Route exact path="/:handle" component={Handle} />
	</Switch>
);

export default DefaultRoutes;
