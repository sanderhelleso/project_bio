import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import SelectCategory from './SelectCategory';
import { Inputs, Input, Label } from '../../styles/Input'; 
import { Button } from '../../styles/Button';
import FeatherIcons from 'feather-icons-react';
import { validateFormByObj } from '../../../lib/validator';
import { alertFormError } from '../../../lib/alert';
import { withToastManager } from 'react-toast-notifications';
import {Checkbox } from '../../styles/Checkbox';
import Container from '../../styles/Container';

class PromoForm extends Component {
    state = {
        promo: this.props.promo,
        checked: false,
        fields: [
            {
                placeholder: 'Promotion code',
                max: 255,
                min: 1,
                name: 'promotion_code',
                type: 'text',
                required: true,
                error: false
            },
            {
                placeholder: 'When does the promotion expire?',
                name: 'expires_at',
                type: 'date',
                min: new Date().toISOString().split('T')[0],
                error: false,
            },
            {
                placeholder: 'Title of promotion',
                max: 70,
                min: 1,
                name: 'title',
                type: 'text',
                required: true,
                error: false
            },
            {
                placeholder: 'Description of promotion',
                max: 255,
                min: 1,
                name: 'description',
                type: 'text',
                required: true,
                error: false,
            },
        ]
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
    }

    handleChange = e => {
        
        // handles all fields and select
        const toUpdate = typeof e === 'object' 
        ? { [e.target.name]: e.target.value }
        : { ['category']: e }

        this.setState({ 
            promo: {
                ...this.state.promo,
                ...toUpdate
            }
        });
    }

    handleCheckboxChange = e => {
        this.setState({ checked: !this.state.checked })
    }

    validatePromo() {
        
        // handle validation
        const valid = validateFormByObj(this.state.promo);
        if (typeof valid === 'object') {
            return valid.forEach(err => alertFormError(this.props, err.error));
        }

        this.props.updatePromo(this.state.promo);
    }

    renderFields() {
        return this.state.fields.map(field => {
            return (
                <Fragment key={field.name}>
                    <Label 
                        htmlFor={field.name} 
                        text={field.name.split('_').join(' ')} 
                    />
                    <Input 
                        {...field} 
                        value={this.state.promo[field.name] || ''}
                        onChange={e => this.handleChange(e)}
                    />
                </Fragment>
            )
        })
    }

    render() {
        return (
            <Container>
                <StyledCont>
                    <StyledForm>
                        <Inputs stretch={true}>
                            <SelectCategory 
                                category={this.state.promo.category}
                                handleChange={this.handleChange}
                            />
                            {this.renderFields()}
                        </Inputs>
                        <Button 
                            size="small"
                            onClick={() => this.validatePromo()}
                        >
                            <FeatherIcons icon="arrow-right" />
                            Continue
                        </Button>
                    </StyledForm>
                    <div>
                        <label>
                            <Checkbox
                                checked={this.state.checked}
                                onChange={e => this.handleCheckboxChange(e)}
                            />
                        </label>
                    </div>
                </StyledCont>
            </Container>
        )
    }
}

export default withToastManager(PromoForm);

const StyledForm = styled.div`
    max-width: 500px;
`;

const StyledCont = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-column-gap: 4rem;
`;