import React, { Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Profile from '../profile/Profile';
import Navbar from '../navbar/Navbar';
import Me from '../me/Me';
import NewPromo from '../promo/new/NewPromo';
import Handle from '../handle/Handle';

const redirHome = () => <Redirect to="/" />;

const AuthenticatedRoutes = () => (
	<Fragment>
		<Route path="/" component={Navbar} />
		<Route exact path="/" component={Me} />
		<Route exact path="/promos/new" component={NewPromo} />
		<Switch>
			<Route exact path="/login" component={redirHome} />
			<Route exact path="/profile" component={Profile} />
			<Route exact path="/:handle" component={Handle} />
		</Switch>
	</Fragment>
);

export default AuthenticatedRoutes;
