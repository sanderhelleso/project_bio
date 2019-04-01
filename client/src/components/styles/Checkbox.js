import React from 'react';
import styled from 'styled-components';

export const Checkbox =  ({ className, checked, ...props }) => (
    <CheckboxContainer className={className}>
        <HiddenCheckbox checked={checked} {...props} />
        <StyledCheckbox checked={checked}>
            {
                checked 
                ? (
                    <Icon viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                    </Icon>
                ) : null
            }
        </StyledCheckbox>
    </CheckboxContainer>
)

const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
    min-height: 50px;
    margin-bottom: -15px;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`

const StyledCheckbox = styled.div`
    display: inline-block;
    width: 30px;
    height: 30px;
    background: ${props => props.checked ? props.theme.primaryColor: '#c5cae9'};
    border-radius: 4px;
    border: 2px solid ${props => props.theme.primaryColor};
    transition: all 0.15s;

    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 2px ${props => props.theme.secondaryColor};
    }
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`