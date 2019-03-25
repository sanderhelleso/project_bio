import React, { Component } from 'react'
import { BrowserRouter as Router} from "react-router-dom";

import DefaultRoutes from './DefaultRoutes';
import AuthenticatedRoutes from './AuthenticatedRoutes';

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
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {  authenticated: state.user.authenticated }
}

export default connect(mapStateToProps, null)(Routes);
