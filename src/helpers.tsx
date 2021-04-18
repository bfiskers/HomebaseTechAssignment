export function capitalizeFirstLetter(string:String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export const blankData = {
    name: "",
    height: 0,
    weight: 0,
    types: [{type: {name: ""}}],
    sprites: {
        front_default: "",
        back_default: ""
    }
}