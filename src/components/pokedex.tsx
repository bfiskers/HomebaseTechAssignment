import React, { useState, useEffect } from 'react';
import PokeDisplay from './pokeDisplay';

function Pokedex() {
    const [num, setNum] = useState("");
    const [activeNum, setActiveNum] = useState(1);
    const [errors, setErrors] = useState(0);
    const maxNum = 898;
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
    const skipNumber = () => {
        setActiveNum(+num)
    }
    const goBack = () => {
        let newNum = activeNum - 1
        if(newNum <= 0) newNum = maxNum
        setActiveNum(newNum);
    }
    const goForward = () => {
        let newNum = activeNum + 1
        if(newNum > maxNum) newNum = 1
        setActiveNum(newNum);
    }
    const findPokemon = (num:Number) => {
        setPokeData(blankData);
        setErrors(2);
        fetch("https://pokeapi.co/api/v2/pokemon/" + activeNum + "/")
            .then(response => response.json())
            .then(data => {setPokeData(data); setErrors(0);})
            .catch(() => setErrors(1))
    }
    useEffect(() => {
        findPokemon(activeNum);
    }, [activeNum]);
    return (
        <>
            <div style={{marginLeft: 40, marginRight: 40, minWidth: 460}} className='card'>
                <header className="card-header">
                    <p className="card-header-title">
                        PokeDex
                    </p>
                </header>
                <div className="card-content">
                    <div className="content">
                        Here you may browse the Pokedex. Use the buttons to navigate or skip to a PokeDex number.
                        <div style={{marginTop: 30}} className="columns">
                            <div className="column is-1">
                                <div className="control">
                                    <button className="button is-link" onClick={goBack}>{"<-"}</button>
                                </div>
                            </div>
                            <div className="column">
                                <div className="control">
                                    <button className="button is-link" onClick={goForward}>{"->"}</button>
                                </div>
                            </div>
                            <div className="column">
                                <div style={{marginRight: 30}} className="control">
                                    <input className="input" type="text" placeholder="Pokedex Number" onChange={(e) => setNum(e.target.value)} value={num}/>
                                </div>
                            </div>
                            <div className="column">
                                <div className="control">
                                    <button className="button is-link" onClick={skipNumber}>Skip</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {PokeDisplay(errors, "number", pokeData)}
        </>
    );
}

export default Pokedex;