import React, { Component } from 'react'
import { Button } from '../../styles/Button';

class DetailsOverview extends Component {
    render() {
        return (
            <div>
                <Button onClick={() => this.props.backToPromo()}>Back</Button>
            </div>
        )
    }
}

export default DetailsOverview;
