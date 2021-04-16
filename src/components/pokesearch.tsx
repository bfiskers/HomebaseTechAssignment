import React, { useState } from 'react';
import {capitalizeFirstLetter} from '../helpers';

function PokeSearch() {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState(2);
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
        setPokeData(blankData)
        fetch("https://pokeapi.co/api/v2/pokemon/" + name.toLowerCase().trim() + "/")
            .then(response => response.json())
            .then(data => {setPokeData(data); setErrors(0);})
            .catch(() => setErrors(1))
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
            <div className="card" style={{marginLeft: 40, marginRight: 40, marginTop: 40, minWidth: 460}}>
                {errors === 1 ?
                <div className="card-content">
                    No Pokemon by that name was found
                </div>:
                <div className="card-content">
                    {errors === 2 ?
                    <></>:
                    <div className="columns">
                        <div className="column">
                            <div className="block">
                                <b>{capitalizeFirstLetter(pokeData.name)}</b>
                            </div>
                            <div className="block">
                                Type{pokeData.types.length > 1 ? "s: " : ": "}{pokeData.types.map(item => capitalizeFirstLetter(item.type.name)).join(", ")}
                            </div>
                            <div className="block">
                                Height: {pokeData.height / 10}m
                            </div>
                            <div className="block">
                                Weight: {pokeData.weight / 10}kg
                            </div>
                        </div>
                        <div className="column is-three-quarters">
                            <div className="media">
                                <img src={pokeData.sprites.back_default} alt={pokeData.name} style={{width: 170, height: 170, marginRight: 50}}/>
                                <img src={pokeData.sprites.front_default} alt={pokeData.name} style={{width: 170, height: 170}}/>
                            </div>
                        </div>
                    </div>}
                </div>}
            </div>
        </>
    );
}

export default PokeSearch;