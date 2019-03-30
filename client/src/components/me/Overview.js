import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Promos from '../promo/Promos';
import Container from '../styles/Container';
import { Grid } from '../styles/Grid';


class Overview extends Component {


    render() {
        return (
            <Container>
                <Grid>
                    <Promos />
                </Grid>
            </Container>
        )
    }
}


const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, null)(Overview);
