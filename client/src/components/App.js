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
  body {
    background-color: ${props => props.bg};
  }
`