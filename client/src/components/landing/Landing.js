import React from 'react';
import Button from '../styles/Button';

const Landing = () => (
    <main>
        <h1>Buttons</h1>
        <Button >
            Button Primary
        </Button>
        <Button disabled={true}>
            Button Primary
        </Button>
        <Button size="small">
            Button Small 
        </Button>
        <Button size="small" disabled={true}>
            Button Small
        </Button>
    </main>
)

export default Landing;