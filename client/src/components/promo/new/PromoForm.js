import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import SelectCategory from './SelectCategory';
import { Inputs, Input, Label } from '../../styles/Input'; 

class PromoForm extends Component {
    state = {
        fields: [
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
            {
                placeholder: 'When does the promotion expire?',
                name: 'expires_at',
                type: 'text',
                error: false,
            },
        ]
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
                        value={this.props.promo[field.name]}
                        onChange={e => this.handleChange(e)}
                    />
                </Fragment>
            )
        })
    }

    render() {
        return (
            <StyledForm>
               <Inputs stretch={true}>
                    {this.renderFields()}
                    <SelectCategory />
               </Inputs>
            </StyledForm>
        )
    }
}

export default PromoForm;

const StyledForm = styled.div`
    max-width: 500px;
    margin: 15vh auto;
`;