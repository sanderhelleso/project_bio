import styled from 'styled-components';

const buttonStyles = `
    padding: 0.25rem 1rem;
    -webkit-box-shadow: 0px 6px 25px 0px rgba(105, 39, 255, 0.5);
    -moz-box-shadow:    0px 6px 25px 0px rgba(105, 39, 255, 0.5);
    box-shadow:         0px 6px 25px 0px rgba(105, 39, 255, 0.5);
	border: none;
	cursor: pointer;
    outline: none;
    text-transform: uppercase;
    letter-spacing: 1.25px;
    border-radius: 4px;
    font-weight: 400;
    transition: 0.3s ease-in-out;
    margin: 1rem;
    font-family: 'Poppins', sans-serif;
`

const disabledStyles = `
    padding: 0.25rem 1rem;
    -webkit-box-shadow: none;
    -moz-box-shadow:    none;
    box-shadow:         none;
	cursor: not-allowed;
`

export default styled.button`
    ${buttonStyles}
    background-color: ${props => props.theme.primaryColor};
    color: ${props => props.theme.fgColor};
    font-size: ${props => props.size === 'small' ? 0.7 : 0.9}rem;
    min-width: ${props => props.size === 'small' ? 125 : 225}px;
    min-height: ${props => props.size === 'small' ? 35 : 45}px;

    &:disabled {
        ${disabledStyles}
        background-color: ${props => props.theme.disabledBg};
        color: ${props => props.theme.disabledColor};
    }
`

