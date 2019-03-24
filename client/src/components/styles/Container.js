import styled  from 'styled-components';

export default styled.div`

    max-width: 75%;

    @media screen and (min-width: 1800px) {
        max-width: 65%;
    }

    @media screen and (max-width: 1000px) {
        max-width: 85%;
    }

    @media screen and (max-width: 600px) {
        max-width: 95%;
    }

    margin: 0 auto;
`