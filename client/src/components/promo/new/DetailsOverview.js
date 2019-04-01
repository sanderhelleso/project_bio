import React, { Component } from 'react'
import styled from 'styled-components';
import { Button, FlatButton } from '../../styles/Button';
import Container from '../../styles/Container';
import { Grid } from '../../styles/Grid';
import FeaterIcons from 'feather-icons-react';

class DetailsOverview extends Component {
    render() {
        return (
            <StyledCont>
                <Grid>
                    <div id="details">
                        <div>
                            <span>Title</span>
                            <h3>{this.props.promo.title}</h3>
                        </div>
                        <p>{this.props.promo.description}</p>
                    </div>
                    <div>
                        <Button>
                            <FeaterIcons icon="check" />
                            Publish
                        </Button>
                        <FlatButton 
                            onClick={() => this.props.backToPromo()}
                        >
                            <FeaterIcons icon="edit" />
                            Edit
                        </FlatButton>
                    </div>
                </Grid>
            </StyledCont>
        )
    }
}

export default DetailsOverview;

const StyledCont = styled.div`
    max-width: 95%;
    margin: 0 auto;
    min-height: 200px;

    #details {
        max-width: 900px;

        p {
            max-width: 90%;
            font-size: 0.9rem;
            color: #212121;
        }

        div {
            min-width: 30%;
            max-width: 30%;
            margin-right: 1%;
            grid-column: 1;

            h3 {
                word-wrap: break-word;
            }

            span {
                text-transform: uppercase;
                letter-spacing: 2px;
                color: #9e9e9e;
                font-size: 0.8rem;
            }
        }
    }
`;
