import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage () {
    return (
        <div className='Landing-Page'>
            <h1 className='Bienvenidos'>Welcome</h1>
            <Link to='/home'>
                <button className="btn">Home</button>
            </Link>
        </div>
    )
};