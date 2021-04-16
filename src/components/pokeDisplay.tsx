import {capitalizeFirstLetter} from '../helpers';
function PokeDisplay(errors:Number, type:string, pokeData:{name:string, height:number, weight:number, types:{type: {name:string}}[], sprites:{front_default:string, back_default:string}}) {
    return (
        <div className="card" style={{marginLeft: 40, marginRight: 40, marginTop: 40, minWidth: 460}}>
                {errors === 1 ?
                <div className="card-content">
                    No Pokemon by that {type} was found
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
    );
}

export default PokeDisplay;