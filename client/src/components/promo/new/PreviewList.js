import React, { Component } from 'react';
import styled from 'styled-components';

import Preview from './Preview';

class PreviewList extends Component {


    renderList() {
        return this.props.list.map(product => {
            return (
                <li key={product.name}>
                    <Preview {...product} />
                </li>
            )
        });
    }

    render() {
        return (
            <StyledPreview>
                <h5>Preview</h5>
                <ul>
                    {this.renderList()}
                </ul>
            </StyledPreview>
        )
    }
}

export default PreviewList;

const StyledPreview = styled.div`
    margin-left: 2rem;
    li {
        list-style: none;
    }
`;