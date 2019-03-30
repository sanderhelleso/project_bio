import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { Button } from '../styles/Button';


const NoPromos = ({ history }) => (
    <StyledNoPromos>
        <h3>You dont have any promos</h3>
        <p>Publish a new promo and make your followers happy</p>
        <Button onClick={() => history.push('/promos/new')}>
            Create
        </Button>
    </StyledNoPromos>
);

export default withRouter(NoPromos);

const StyledNoPromos = styled.div`
    text-align: center;
    margin-top: 15vh;
    
    h3 {
        font-size: 1.75rem;
        margin-bottom: 0.5rem;
    }

    p {
        font-size: 0.9rem;
        color: #9e9e9e;
        margin-top: 0;
    }

    button {
        margin-top: 2rem;
    }
`;