import React, { Component } from 'react';
import styled from 'styled-components';

import Container from '../../styles/Container';
import { Grid } from '../../styles/Grid';
import Form from './form/Form';
import PreviewList from './PreviewList';
import UploadPromoImage from './form/UploadPromoImage';

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