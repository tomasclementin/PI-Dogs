import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { getAllDogs, getAllTempers, searchByName, orderByOrigin, orderByTemper, orderByAlphabet, orderByWeight, filterByLife } from '../actions';
import Paginado from './Paginado';
import NavBar from './NavBar';
import './Home.css';

export default function Home () {

    const dispatch = useDispatch();
    const dogs = useSelector(sate => sate.dogs);
    const tempers = useSelector(state => state.tempers);
    const [input, setInput] = useState({
        name: ''
    });
    const [orden, setOrden] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

    function paginado(pageNumber) {
        setCurrentPage(pageNumber);
    };

    function handleInput(e){
        e.preventDefault();
        setInput({name: e.target.value});
    };

    function handleClick(e){
        e.preventDefault();
        dispatch(searchByName(input.name));
        setCurrentPage(1);
    };

    function handleOrderByOrigin(e){
        e.preventDefault();
        dispatch(orderByOrigin(e.target.value));
        setCurrentPage(1);
    };

    function handleOrderByTemper(e){
        e.preventDefault();
        dispatch(orderByTemper(e.target.value));
        setCurrentPage(1);
    };

    function handleOrderByAlphabet(e){
        e.preventDefault();
        dispatch(orderByAlphabet(e.target.value));
        setOrden(`Ordenado segun ${e.target.value}`);
        setCurrentPage(1);
    };

    function handleOrderByWeight(e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setOrden(`Ordenado segun ${e.target.value}`);
        setCurrentPage(1);
    };

    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getAllTempers());
    }, [dispatch]);

    return (
        <div className='Home'>
            <div>
            <NavBar/>
            <div className='Home-Headers'>
                <div className='Home-SearchBar'>
                    <input className='SearchBar' type='text' placeholder='Search by name...'
                        name='name' value={input.name} onChange={e => handleInput(e)}></input>
                    <button className='SearchBar-Btn' onClick={e => handleClick(e)}>Search</button>
                </div>
                <div className='Home-Selects'>
                    <select className='Home-Select' onChange={e => handleOrderByOrigin(e)}>
                        <option value='All'>All races</option>
                        <option value='Api'>Existent</option>
                        <option value='Created'>Created</option>
                    </select>
                    <select className='Home-Select' onChange={e => handleOrderByTemper(e)}>
                        <option value='All'>All temperaments</option>
                        <option value='No temper'>Undefined temperament</option>
                        {
                        tempers && tempers.map(t => (
                            <option key={t.id} value={t.name}>{t.name}</option>
                        ))
                        }
                    </select>
                    <select className='Home-Select' onChange={e => handleOrderByAlphabet(e)}>
                        <option value='Asc'>A-Z</option>
                        <option value='Desc'>Z-A</option>
                    </select>
                    <select className='Home-Select' onChange={e => handleOrderByWeight(e)}>
                        <option value='Unordered'>Weight: unordered</option>
                        <option value='Peso+'>Weight +</option>
                        <option value='Peso-'>Weight -</option>
                    </select>
                </div>
            </div>
            <div>
                <div>
                <Paginado 
                    dogsPerPage = {dogsPerPage}
                    allDogs = {dogs.length}
                    paginado = {paginado}
                    currentPage = {currentPage}
                />
                </div>
                <div className='HomeDiv-H1'>
                    <h1 className='Home-H1'>Dogs</h1>
                </div>
                <div className='Cards'>
                {
                    currentDogs && currentDogs.map(d => (
                        <div className='Card' key={d.id}>
                            <Link className='CardLink' to={`/dogs/${d.id}`}>
                                <h1 className='CardLink-h1'>{d.name}</h1>
                            </Link>
                            <img src={d.img}
                                alt='imagen!'  className='CardImg'/>
                            {d.tempers ? ( d.tempers[0].name !== 'No temper' ? <h3 className='Home-h'>{d.tempers[0].name}</h3> : null)
                                : (d.temper ? <h3 className='Home-h'>{d.temper}</h3> : null)}
                            <h3 className='Home-h'>{d.weight} lb</h3>
                        </div>
                    ))
                }
                </div>
            </div>
            </div>
        </div>
    )
};