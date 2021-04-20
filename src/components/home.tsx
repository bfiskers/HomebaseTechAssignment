import { useState } from 'react';
import Pokedex from './pokedex';
import PokeSearch from './pokesearch';

function Home() {
    let lastKnownState = window.localStorage.getItem(`lastKnown_${window.location.href}`); 
    let lastKnownState2 = Object(lastKnownState && JSON.parse(lastKnownState));
    const [active, setActive] = useState(lastKnownState2 && lastKnownState2.conditions ? lastKnownState2.conditions.active : 0);
    
    const pages = ["PokeSearch", "Pokedex"];
    let lastKnownStatePS = window.localStorage.getItem(`lastKnownPS_${window.location.href}`); 
    lastKnownStatePS = lastKnownStatePS && JSON.parse(lastKnownStatePS);
    let lKSPS = Object(lastKnownStatePS);

    let lastKnownStatePD = window.localStorage.getItem(`lastKnownPD_${window.location.href}`); 
    lastKnownStatePD = lastKnownStatePD && JSON.parse(lastKnownStatePD);
    let lKSPD = Object(lastKnownStatePD);
    
    const components = [PokeSearch(lKSPS ? lKSPS.conditions : {}), Pokedex(lKSPD ? lKSPD.conditions : {})];

    window.addEventListener("beforeunload", () => {
        window.localStorage.setItem(
          `lastKnown_${window.location.href}`,
          JSON.stringify({
            conditions: {
              active
            }
          })
        );
    });
    return (
        <>
            <div className="tabs is-centered is-large">
                <ul>
                    {pages.map((item, ind) => 
                        <li key={ind} className={active === ind ? "is-active" : ""} onClick={() => setActive(ind)}><a>{item}</a></li>
                    )}
                </ul>
            </div>
            {components[active]}
        </>
    );
}

export default Home;