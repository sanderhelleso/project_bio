import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import DefaultRoutes from './DefaultRoutes';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import Handle from '../handle/Handle';

import { connect } from 'react-redux';

class Routes extends Component {
    
    routeHandler() {

        if (this.props.authenticated) {
            return <AuthenticatedRoutes />
        }

        else return <DefaultRoutes />
    }

    render() {
        return (
            <Router>
                {this.routeHandler()}
                <Route exact path="/:handle" component={Handle} />
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {  authenticated: state.user.authenticated }
}

export default connect(mapStateToProps, null)(Routes);
