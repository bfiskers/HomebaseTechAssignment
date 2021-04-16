import { useState } from 'react';
import Pokedex from './pokedex';
import PokeSearch from './pokesearch';

function Home() {
    const [active, setActive] = useState(0);
    const pages = ["PokeSearch", "Pokedex"];
    const components = [<PokeSearch/>, <Pokedex/>];
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