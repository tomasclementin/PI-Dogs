import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { getAllDogs, getAllTempers, searchByName } from '../actions';

export default function Home () {

    const dispatch = useDispatch();
    const dogs = useSelector(sate => sate.dogs);
    const tempers = useSelector(state => state.tempers);
    const [input, setInput] = useState({
        name: ''
    });

    function handleChange(e){
        e.preventDefault();
        setInput({name: e.target.value});
    };

    function handleClick(e){
        e.preventDefault();
        dispatch(searchByName(input.name));
    };

    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getAllTempers());
    }, [dispatch]);

    return (
        <div>
            <input type='text' placeholder='Buscar por nombre...' name='name'
                value={input.name} onChange={e => handleChange(e)}></input>
            <button onClick={e => handleClick(e)}>Buscar</button>
            <select>
                <option value='All'>Todas las razas</option>
                <option value='Api'>Existentes</option>
                <option value='Created'>Creadas</option>
            </select>
            <select>
                <option>Filtrar por temperamento</option>
                {
                tempers && tempers.map(t => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                ))
                }
            </select>
            <select>
                <option value='Unordered'>Sin orden</option>
                <option value='Asc'>A-Z</option>
                <option vlaue='Desc'>Z-A</option>
            </select>
            <select>
                <option value='Peso+'>Peso +</option>
                <option value='Peso-'>Peso -</option>
            </select>
            <div>
                <h1>Dogs</h1>
                {
                    dogs && dogs.map(d => (
                        <div key={d.id}>
                            <Link to={`/dogs/${d.id}`}>
                                <h1>{d.name}</h1>
                            </Link>
                            <img src={d.img} alt='imagen!' width='400px'/>
                            <h3>{d.temper}</h3>
                            <h3>{d.weight} kg</h3>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};