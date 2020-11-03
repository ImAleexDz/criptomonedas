import React, { Fragment, useState } from 'react'

const useMoneda = () => {

    //State del custom Hook
    const [state, setState] = useState('');

    const Seleccionar = () => (
        <Fragment>
            <label>Moneda</label>
            <select>
                <option value="MXN">Peso Mexicano</option>
            </select>
        </Fragment>
    );

    //Retornar el state, interfaz y func que modifica el state
    return [state, Seleccionar, setState];

}

export default useMoneda
