import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Form from './components/Form';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import axios from 'axios'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {
  //crear el state
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    
    const cotizarCripto = async () => {
      //Evitamos la ejecución la primera vez
    if(moneda === '') return;

    //consultar la api para obtener la cotización
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    const resultado = await axios.get(url);

    //mostrar spinner 
    setCargando(true);
    
    //Ocultar spinner y mostrar resultado
    setTimeout(() => {

      //Ocultamos spinner
      setCargando(false);
      //Mostramos la cotización
      setResultado(resultado.data.DISPLAY[criptomoneda][moneda])
    }, 3000)

    };

    cotizarCripto();

  }, [moneda, criptomoneda]);

  //Mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado}/>

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="Imagen cripto"
        />
      </div>
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>

        <Form 
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
