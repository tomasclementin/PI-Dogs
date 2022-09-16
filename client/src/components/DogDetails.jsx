import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogDetails } from '../actions';

export default function DogDetails (props) {

    let id = props.match.params.id;
    const dogDetails = useSelector(state => state.dogDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDogDetails(id))
    },[dispatch, id]);

    return (
        <div>
            {
                dogDetails.length && 
                <div>
                    <h1>{dogDetails[0].name}</h1>
                    <img src={dogDetails[0].img} alt='imagen!' width='450px'/>
                    <h3>Temperamento: {dogDetails[0].temper}.</h3>
                    <h3>Altura: {dogDetails[0].height} cm.</h3>
                    <h3>Peso: {dogDetails[0].weight} Kg.</h3>
                    <h3>Expectativa de vida: {dogDetails[0].yearsOld.replace('years', 'años')}.</h3>
                </div>
            }
        </div>
    )
};