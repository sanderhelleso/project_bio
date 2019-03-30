import React, { Component } from 'react';
import styled from 'styled-components';

class PreviewList extends Component {
    render() {
        return (
            <StyledPreview>
                <h5>Preview</h5>
            </StyledPreview>
        )
    }
}

export default PreviewList;

const StyledPreview = styled.div`
    margin-left: 2rem;
`;