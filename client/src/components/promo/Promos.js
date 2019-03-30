import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PromosList from './PromosList';
import NoPromos from './NoPromos';

class Promos extends Component {

    componentDidMount() {
        console.log(this.props)
    }

    renderPromos() {
        if (this.props.promos.amount === 0) {
            return <NoPromos />
        }

        return <PromosList list={this.props.promos.list} />
    }

    render() {
        return (
            <div>
                <h5>My Promos</h5>
                {this.renderPromos()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { promos: state.promos }
}

export default connect(mapStateToProps, null)(Promos);
