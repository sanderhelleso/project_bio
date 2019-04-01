import React, { Component, Fragment } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ToastConsumer, ToastProvider, withToastManager } from 'react-toast-notifications';

import Routes from './routes/Routes';
import theme from './styles/Theme';

class App extends Component {
    render() {
        return (
            <ToastProvider placement="bottom-left">
                <ThemeProvider theme={theme}>
                    <Routes />
                </ThemeProvider>
                <GlobalStyle bg={theme.bgColor} />
            </ToastProvider>
        )
    }
}

export default App;


const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
    }

    *, *:before, *:after {
        box-sizing: inherit;
    }

    p {
        line-height: 1.8;
    }

    body {
        @import url('https://fonts.googleapis.com/css?family=Poppins:300,400,700');
        font-family: 'Poppins', sans-serif;
        background-color: ${props => props.bg};
        overflow-x: hidden;
        margin: 0;
    } 

    input::-webkit-inner-spin-button, 
    input::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }
`