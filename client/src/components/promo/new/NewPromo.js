import React, { Component } from 'react';
import styled from 'styled-components';

import Container from '../../styles/Container';
import { Grid } from '../../styles/Grid';
import ImageUpload from './form/ImageUpload';
import Form from './form/Form';
import PreviewList from './PreviewList';

class NewPromo extends Component {
    state = {
        products: []
    }

    updateProducts = product => {
        this.setState({ 
            products: [...this.state.products, product] 
        }, () => console.log(this.state));
    }
    

    render() {
        return (
            <StyledNewPromo>
                <Container id="cont">
                    <Grid>
                        <ImageUpload />
                        <Form updateProducts={this.updateProducts} />
                        <PreviewList list={this.state.products} />
                    </Grid>
                </Container>
            </StyledNewPromo>
        )
    }
}

export default NewPromo;

const StyledNewPromo = styled.div`
    margin: 15vh auto;

    #cont {
        min-width: 85%;
    }

`;