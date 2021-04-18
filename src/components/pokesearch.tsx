import { useState, useRef } from 'react';
import PokeDisplay from './pokeDisplay';
import {blankData} from '../helpers';

function PokeSearch(starter:Object) {
    const state = {
        errors: 2,
        pokeData: blankData,
        ...starter
    }
    const [name, setName] = useState("");
    const errors = useRef(state.errors);
    const [pokeData, setPokeData] = useState(state.pokeData);
    const findPokemon = () => {
        fetch("https://pokeapi.co/api/v2/pokemon/" + name.toLowerCase().trim() + "/")
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
    window.addEventListener("beforeunload", () => {
        window.localStorage.setItem(
          `lastKnownPS_${window.location.href}`,
          JSON.stringify({
            conditions: {
              errors: errors.current,
              pokeData
            }
          })
        );
    });
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
            {errors.current !== 2 ?
            PokeDisplay(errors.current, "name", pokeData):
            null}
        </>
    );
}

export default PokeSearch;