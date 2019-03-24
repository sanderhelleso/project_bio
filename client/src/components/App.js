import React, { Component } from 'react'

class App extends Component {
    state = {
        greeting: 'Hello World'
    }

    render() {
        return <h1>{this.state.greeting}</h1>
    }
}

export default App;