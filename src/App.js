import React from 'react';
import styled from '@emotion/styled';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat()(2, 1fr);
    column-gap: 2rem;
  }
`;

function App() {
  return (
    <h1>Cotizador de criptomonedas</h1>
  );
}

export default App;
