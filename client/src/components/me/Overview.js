import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Promos from '../promo/Promos';
import Container from '../styles/Container';


class Overview extends Component {


    render() {
        return (
            <Container>
                <Promos />
            </Container>
        )
    }
}


const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, null)(Overview);
