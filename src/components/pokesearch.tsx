import React, { useState, useRef, useEffect } from 'react';
import {capitalizeFirstLetter} from '../helpers';
import PokeDisplay from './pokeDisplay';

function PokeSearch() {
    const [name, setName] = useState("");
    const errors = useRef(2);
    const blankData = {
        name: "",
        height: 0,
        weight: 0,
        types: [{type: {name: ""}}],
        sprites: {
            front_default: "",
            back_default: ""
        }
    }
    const [pokeData, setPokeData] = useState(blankData);
    const findPokemon = () => {
        fetch("https://pokeapi.co/api/v2/pokemon/" + name.toLowerCase().trim() + "/")
            .then(response => response.json())
            .then(data => {errors.current = 0; setPokeData(data);})
            .catch(() => {errors.current = 1; setPokeData(blankData);})
    }
    return (
        <>
            <div style={{marginLeft: 40, marginRight: 40, minWidth: 460}} className='card'>
                <header className="card-header">
                    <p className="card-header-title">
                        PokeSearch
                    </p>
                </header>
                <div className="card-content">
                    <div className="content">
                        Here you may search for pokemon by name. Type in a name below to begin:
                        <div style={{marginTop: 30}} className="field is-grouped">
                            <div style={{marginRight: 30}} className="control">
                                <input className="input" type="text" placeholder="Pokemon Name" onChange={(e) => setName(e.target.value)} value={name}/>
                            </div>
                            <div className="control">
                                <button className="button is-link" onClick={findPokemon}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {PokeDisplay(errors.current, "name", pokeData)}
        </>
    );
}

export default PokeSearch;