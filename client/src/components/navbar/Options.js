import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../styles/Keyframes';

function renderOptions() {
    const options = [
        { 
            title: 'Logout',
            action: logout => console.log(123)
        },
        {
            title: 'Profile',
            action: profile => console.log(321)
        }
    ];

    return options.map(option => {
        return (
            <li onClick={option.action}>
                {option.title}
            </li>
        )
    });
}

const Options = () => (
    <StyledOptions>
        {renderOptions()}
    </StyledOptions> 
);

export default Options;

const StyledOptions = styled.ul`
    min-width: 100%;
    display: block;
    background-color: #ffffff;
    list-style: none;
    padding: 1rem;
    margin-top: -2.5px;
    bottom: 0;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
    border-top: 0.5px solid #eeeeee;
    animation: ${fadeIn} 0.3s ease-in-out forwards;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;

    li {
        font-size: 0.9rem;
        min-height: 2rem;
        margin: 0.5rem 0;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
`;

