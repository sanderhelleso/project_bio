import React from 'react';
import Container from '../styles/Container';
import { Button, Buttons } from '../styles/Button';
import { Inputs, Input } from '../styles/Input';

const Landing = () => (
    <Container>
        <h1>Buttons</h1>
        <Buttons>
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
        </Buttons>
        <h1>Inputs</h1>
        <Input placeholder="Input field..." />
        <Input placeholder="Disabled field..."  disabled={true}/>
    </Container>
)

export default Landing;