import styled from 'styled-components';

export const Grid = styled.div`
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    display: grid;
    grid-auto-columns: 1fr auto;
    grid-auto-flow: column;
    column-gap: 4rem;
`;