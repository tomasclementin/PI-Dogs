import React from 'react';
import './Paginado.css';

export default function Paginado ({allDogs, dogsPerPage, paginado, currentPage}) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i);
    };
    
    return (
        <nav>
            <ul>
                <button className='Paginado-BtnNextPrev' onClick={currentPage > 1 ? () => paginado(currentPage - 1) : null}>{'<< Prev'}</button>
                {
                    pageNumbers && pageNumbers.map(number => (
                        <button className='Paginado-Btn' key={number} onClick={() => paginado(number)}>{number}</button>
                    ))
                }
                <button className='Paginado-BtnNextPrev' onClick={currentPage < pageNumbers.length ? () => paginado(currentPage + 1) : null}>{'Next >>'}</button>
            </ul>
        </nav>
    )
};