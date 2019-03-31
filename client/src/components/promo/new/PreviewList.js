import React, { Component } from 'react';
import styled from 'styled-components';

import Preview from './Preview';

class PreviewList extends Component {

    selectProduct = product => {
        this.props.selectProduct(product);
    }

    renderList() {
        return this.props.list.map(product => {
            return (
                <li 
                    key={product.name} 
                    onClick={() => this.selectProduct(product)}
                >
                    <Preview {...product} />
                </li>
            )
        });
    }

    render() {
        return (
            <StyledPreview>
                <ul>
                    {this.renderList()}
                </ul>
            </StyledPreview>
        )
    }
}

export default PreviewList;

const StyledPreview = styled.div`
    max-width: 275px;
    min-width: 275px;
    margin: 0 auto;

    ul {
        padding: 0;

        li {
           list-style: none;
           margin-bottom: 2rem;
        }
    }
`;