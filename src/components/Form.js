import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Form = ({setMoneda, setCriptomoneda}) => {

    //state del listado de criptomonedas
    const [listacripto, setCripto] = useState([]);
    const [error, setError] = useState(false);

    const Monedas = [
        { codigo: 'USD', nombre: 'Dolar Americano' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ]

    //utilizar useMoneda
    //SelectMonedas es mi función Seleccionar de useMoneda
    const [ moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', Monedas);

    //utilizar useCriptomoneda
    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu criptomoneda', '', listacripto);

    //Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url)

            setCripto(resultado.data.Data)
        }
        consultarAPI();
    }, []);

    const cotizarMoneda = e => {
        e.preventDefault();
        
        //Validar si ambos campos están llenos
        if(moneda === '' || criptomoneda === '') {
            setError(true);
            return;
        }

        //Pasar los datos al componente principal
        setError(false);
        setMoneda(moneda);
        setCriptomoneda(criptomoneda)

    }

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
            <SelectMonedas />
            <SelectCripto />
            <Boton 
                type="submit"
                value="Calcular"
            />
        </form>
    )
}

export default Form
