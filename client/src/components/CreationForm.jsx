import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { createNewDog, getAllTempers } from "../actions";
import { useEffect } from "react";
import NavBar from "./NavBar";
import './CreationForm.css'

function validator ({name, height, weight, yearsOld, temper}) {
    let errors = {};
    if(!name || ! /^[a-zA-Z]+$/i.test(name)) errors.name = 'You must introduce a valid name';
    if(!height || ! /^[0-9]+$/i.test(height)) errors.height = 'You must introduce a valid height';
    if(!weight || ! /^[0-9]+$/i.test(weight)) errors.weight = 'You must introduce a valid weight';
    if(!yearsOld || ! /^[0-9]+$/i.test(yearsOld)) errors.yearsOld = 'You must introduce a valid life span';
    if(!temper.length) errors.temper = 'You must choose an option';
    return errors;
};

export default function CreationForm () {

    const dispatch = useDispatch();
    const tempers = useSelector(state => state.tempers);
    const [input, setInput] = useState({
        name: '',
        height: '',
        weight: '',
        yearsOld: '',
        img: '',
        temper: []
    });
    const [errors, setErrors] = useState({ temper: []});

    function handleChange(e){
        e.preventDefault();
        setInput({...input, [e.target.name]: e.target.value})
        setErrors(validator({...input, [e.target.name]: e.target.value}));
    };

    function handleSelect(e){
        e.preventDefault();
        setInput({...input, temper: [...input.temper, e.target.value]});
        setErrors(validator({...input, temper: [...input.temper, e.target.value]}));
        console.log(input.temper);
    };

    function temperDelete(e) {
        e.preventDefault();
        setInput({...input, temper: input.temper.filter(t => t !== e.target.value)});
    };

    function handleSubmit(e){
        e.preventDefault();
        if(!errors.name && !errors.height && !errors.weight && !errors.yearsOld && input.temper.length) {
            setInput({
                ...input,
                height: parseInt(input.height),
                weight: parseInt(input.weight),
                yearsOld: parseInt(input.yearsOld)
            });
            dispatch(createNewDog(input));
            setInput({
                name: '',
                height: '',
                weight: '',
                yearsOld: '',
                img: '',
                temper: []
            });
            return alert('New dog race created successfully!');
        }
        else return alert('You must complete the form correctly!')
    };

    useEffect(() => {
        dispatch(getAllTempers());
    }, []);

    return (
        <div className="Create">
            <NavBar/>
            <div className="CreationForm">
                <div className="Form">
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className="Creation-FormElement">
                            <label className="Creation-Label">Name </label>
                            <input className="Creation-Input" value={input.name} name='name'
                                onChange={e => handleChange(e)}></input>
                            {
                                errors.name && <div className={errors.name && "Form-Errors"}>
                                    <p>{errors.name}</p>
                                </div>
                            }
                        </div>
                        <div className="Creation-FormElement">
                            <label className="Creation-Label">Height (cm) </label>
                            <input className="Creation-Input" value={input.height} name='height'
                                onChange={e => handleChange(e)}></input>
                            {
                                errors.height && <div className={errors.height && "Form-Errors"}>
                                    <p>{errors.height}</p>
                                </div>
                            }
                        </div>
                        <div className="Creation-FormElement">
                            <label className="Creation-Label">Weight (lb) </label>
                            <input className="Creation-Input" value={input.weight} name='weight'
                                onChange={e => handleChange(e)}></input>
                            {
                                errors.weight && <div className={errors.weight && "Form-Errors"}>
                                    <p>{errors.weight}</p>
                                </div>
                            }
                        </div>
                        <div className="Creation-FormElement">
                            <label className="Creation-Label">Life span (years) </label>
                            <input className="Creation-Input" value={input.yearsOld}
                                name='yearsOld' onChange={e => handleChange(e)}></input>
                            {
                                errors.yearsOld && <div className={errors.yearsOld && "Form-Errors"}>
                                    <p>{errors.yearsOld}</p>
                                </div>
                            }
                        </div>
                        <div className="Creation-FormElement">
                            <label className="Creation-Label">Image (url/link) </label>
                            <input className="Creation-Input" value={input.img}
                                name='img' onChange={e => handleChange(e)}></input>
                        </div>
                        <div className="Creation-FormElement">
                            <label className="Creation-Label">Temperament </label>
                            <select className="Creation-Input" onChange={e => handleSelect(e)}>
                                <option value='No temper'>Undefined temperament</option>
                                {
                                    tempers.map(t => (
                                        <option key={t.id} value={t.name}>{t.name}</option>
                                    ))
                                }
                            </select>
                            {
                                errors.temper ? <div className={errors.temper.length && "Form-Errors"}>
                                    <p>{errors.temper}</p>
                                </div> : null
                            }
                        </div>
                            <button className="Creation-Btn" type="submit">Create</button>
                    </form>
                </div>
                <div className="Form-Preview">
                    <h1 className="Preview-H">Your new dog race:</h1>
                    <div className="Preview-Div">
                        <h3 className="Preview-H">Name: </h3>
                        {input.name && <h4 className="Preview-h4">{input.name}</h4>}
                    </div>
                    <div className="Preview-Div">
                        <h3 className="Preview-H">Height: </h3>
                        {input.height && <h4 className="Preview-h4">{input.height} cm</h4>}
                    </div>
                    <div className="Preview-Div">
                        <h3 className="Preview-H">Weight: </h3>
                        {input.weight && <h4 className="Preview-h4">{input.weight} lb</h4>}
                    </div>
                    <div className="Preview-Div">
                        <h3 className="Preview-H">Life span: </h3>
                        {input.yearsOld && <h4 className="Preview-h4">{input.yearsOld} years</h4>}
                    </div>
                    <div className="Preview-Div">
                        <h3 className="Preview-H">Temperament: </h3>
                        {input.temper && <div className="Preview-Tempers">{input.temper.map(t => (
                            <div className="Preview-Temper" key={input.temper.indexOf(t)}>
                                <button className="Preview-Btn" value={t} onClick={e => temperDelete(e)}>x</button>
                                <h4 className="Preview-h4">{t}</h4>
                            </div>
                        ))}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
};