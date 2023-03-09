// Create a personalized Pokémon model for conversion of PokeAPI information
class Pokemon {
    id;
    name;
    types = [];
    mainType;
    picture;
    abilities = [];
    height;
    weight;
    stats = {
        health: null,
        attack: null,
        defense: null,
        spAttack: null,
        spDefense: null,
        speed: null,
        total: null
    };
};