import React from "react";
import { Link } from 'react-router-dom';
import './NavBar.css';
import Logo from '../dog.png'

export default function NavBar () {

    return (
        <div className="NavBar">
            <div className="NavBar-DivImg">
                <img src={Logo}
                    alt="Logo" className="NavBar-Img"/>
            </div>
            <div className="NavBar-Links">
                <Link className="NavBar-Link" to='/home'>
                    <button className="Btn-NavBar">Home</button>
                </Link>
                <Link className="NavBar-Link" to='/create'>
                    <button className="Btn-NavBar">Create race</button>
                </Link>
            </div>
        </div>
    )
};