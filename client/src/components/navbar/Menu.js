import React, { Component } from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';
import FeaterIcons from 'feather-icons-react';
import Options from './Options';
import { fadeIn } from '../styles/Keyframes';

class Menu extends Component {
    state = {
        active: false
    }

    formatName() {

        if (this.props.name.length > 17) {
            
            // check if name can be splitted
            const splitted = this.props.name.split(' ');
            if (splitted.length > 1) {
                return splitted[0];
            }

            else return `${this.props.name.substring(0, 17)}...`;
        }

        return this.props.name;
    }

    renderMenu() {
        if (this.state.active) {
            return <Options />
        }

        return null;
    }

    render() {
        return (
            <StyledMenu>
                <div id="menu-cont">
                    <Avatar 
                        source={this.props.avatar}
                        handle={this.props.handle}
                    />
                    <div id="inner">
                        <p>{this.formatName()}</p>
                        <span onClick={() => this.setState({ active: !this.state.active })}>
                            <FeaterIcons icon={!this.state.active ? 'chevron-down' : 'x'} />
                        </span>
                    </div>
                </div>
                {this.renderMenu()}
            </StyledMenu>
        )
    }
}

export default Menu;

const StyledMenu = styled.div`
    min-width: 285px;
    max-width: 285px;
    min-height: 3.35rem;
    max-height: 3.35rem;
    background-color: #ffffff;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
    position: absolute;
    top: 1.25rem;
    right: 3rem;
    border-radius: 4px;
    animation: ${fadeIn} 1s ease-in-out;

    #menu-cont {
        display: flex;
        min-height: 3.35rem;
        max-height: 3.35rem;

        #inner {
            min-width: 75%;
        }
        
        p {
            color: black;
            font-size: 0.8rem;
            margin-top: 1rem;
            margin-left: 0.75rem;
            min-width: 75%;
            max-width: 75%;
            display: inline-block;
        }

        span {

            margin-top: 1rem;
            margin-right: 0.75rem;
            opacity: 0.7;
            float: right;
            cursor: pointer;

            svg {
                stroke: #9e9e9e;
                height: 1.35rem;
                width: 1.35rem;
            }
        }
    }
`;

