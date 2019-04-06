import React, { Component, Fragment } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ToastConsumer, ToastProvider, withToastManager } from 'react-toast-notifications';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

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
		);
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
        background-color: ${(props) => props.bg};
        overflow-x: hidden;
        margin: 0;
    } 

    input::-webkit-inner-spin-button, 
    input::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }

    ::-webkit-scrollbar {
        width: 0.65em;
    }
    
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
        background-color: #eeeeee;
    }
    
    ::-webkit-scrollbar-thumb {
        background-color: #bdbdbd;
        outline: 1px solid #9e9e9e;
    }

    /* class for text not to be selected or focused */
    .no-select {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                        supported by Chrome and Opera */
    }

    ul li {
        list-style: none;
    }

`;
