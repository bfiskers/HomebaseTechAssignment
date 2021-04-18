import { useState, useEffect, useRef } from 'react';
import PokeDisplay from './pokeDisplay';
import {blankData} from '../helpers';

function Pokedex(starter:Object) {
    const state = {
        errors: 2,
        pokeData: blankData,
        activeNum: 1,
        ...starter
    }
    const [num, setNum] = useState("");
    let activeNum = useRef(state.activeNum);
    let errors = useRef(state.errors);
    const maxNum = 898;
    const [pokeData, setPokeData] = useState(state.pokeData);
    const skipNumber = () => {
        activeNum.current = +num;
        findPokemon(+num);
    }
    const goBack = () => {
        let newNum = activeNum.current - 1
        if(newNum <= 0) newNum = maxNum
        activeNum.current = newNum;
        findPokemon(newNum);
    }
    const goForward = () => {
        let newNum = activeNum.current + 1
        if(newNum > maxNum) newNum = 1
        activeNum.current = newNum;
        findPokemon(newNum);
    }
    const findPokemon = (num:Number) => {
        fetch("https://pokeapi.co/api/v2/pokemon/" + num + "/")
            .then(response => response.json())
            .then(data => {
                errors.current = 0; 
                setPokeData(data);
            })
            .catch(() => {
                errors.current = 1; 
                setPokeData(blankData);
            })
    }
    useEffect(() => {
        if(errors.current === 2){
            errors.current = 0
            findPokemon(1)
        }
    }, []);
    window.addEventListener("beforeunload", () => {
        window.localStorage.setItem(
          `lastKnownPD_${window.location.href}`,
          JSON.stringify({
            conditions: {
              errors: errors.current,
              pokeData,
              activeNum: activeNum.current
            }
          })
        );
    });
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
            {PokeDisplay(errors.current, "number", pokeData)}
        </>
    );
}

export default Pokedex;