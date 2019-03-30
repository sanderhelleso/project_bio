import React, { Component } from 'react';
import styled from 'styled-components';

import Container from '../../styles/Container';
import { Grid } from '../../styles/Grid';
import ImageUpload from './ImageUpload';
import Form from './Form';
import PreviewList from './PreviewList';

class NewPromo extends Component {
    render() {
        return (
            <Container>
                <StyledNewPromo>
                    <Grid>
                        <ImageUpload />
                        <Form />
                        <PreviewList />
                    </Grid>
                </StyledNewPromo>
            </Container>
        )
    }
}

export default NewPromo;

const StyledNewPromo = styled.div`
    margin-top: 15vh;
`;