import React, { Component, Fragment } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import Routes from './routes/Routes';
import theme from './styles/Theme';

class App extends Component {
    render() {
        return (
            <Fragment>
                <ThemeProvider theme={theme}>
                    <Routes />
                </ThemeProvider>
                <GlobalStyle bg={theme.bgColor} />
            </Fragment>
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

    body {
        @import url('https://fonts.googleapis.com/css?family=Poppins:300,400,700');
        font-family: 'Poppins', sans-serif;
        background-color: ${props => props.bg};
    } 
`