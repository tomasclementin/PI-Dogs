import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogDetails } from '../actions';
import NavBar from './NavBar';
import './DogDetails.css';

export default function DogDetails (props) {

    let id = props.match.params.id;
    const dogDetails = useSelector(state => state.dogDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDogDetails(id));
    },[dispatch, id]);

    return (
        <div className='DogDetails'>
            <NavBar/>
            <div className='DogDetail'>
            {
                dogDetails.length && 
                <div className='Card'>
                    <h1 className='Card-h'>{dogDetails[0].name}</h1>
                    <img className='Card-Img' src={dogDetails[0].img ? dogDetails[0].img : 'https://pixabay.com/static/uploads/photo/2013/07/12/17/50/caution-152540_640.png'}
                        alt='imagen!' width='450px'/>
                    <h3 className='Card-h'>Temperament: {dogDetails[0].tempers ? dogDetails[0].tempers[0].name
                        : (dogDetails[0].temper ? dogDetails[0].temper : 'Undefined temperament')}.</h3>
                    <h3 className='Card-h'>Height: {dogDetails[0].height} cm.</h3>
                    <h3 className='Card-h'>Weight: {dogDetails[0].weight} lb.</h3>
                    <h3 className='Card-h'>Life span: {typeof dogDetails[0].yearsOld === 'string' ?
                        dogDetails[0].yearsOld : dogDetails[0].yearsOld + ' years'}.</h3>
                </div>
            }
            </div>
        </div>
    )
};