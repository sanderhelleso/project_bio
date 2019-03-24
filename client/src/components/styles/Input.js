import styled from 'styled-components';

const inputStyles = `
    outline: none;
    background-image: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    font-size: 1rem;
    padding: 0.75rem 1rem;
    font-family: 'Poppins', sans-serif;
    border-radius: 4px;
    transition: 0.3s ease-in-out;
    margin: 1rem;
`;

export default styled.input`
    ${inputStyles}
    border: 1.5px solid ${props => props.theme.disabledBg};
    background-color: transparent;

    &::placeholder {
        opacity: 0.7;
    }

    &:focus, &:active {
        border: 1.5px solid ${props => props.theme.primaryColor};
    }

    &:disabled {
        background-color: ${props => props.theme.disabledBg};
        cursor: not-allowed;
        opacity: 0.7;

        &:focus, &:active {
            border: 1.5px solid ${props => props.theme.disabledBg};
        }
    }
`