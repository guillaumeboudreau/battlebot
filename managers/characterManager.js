const gameplayData = require("../data/gameplay.json");
const Character = require("../models/character");

class CharacterManager {
    constructor() {
        /** @type {Array.<Character>} */
        this._characters = [];
        for (let i = 0; i < gameplayData.characters.length; i++) {
            this._characters.push(new Character(gameplayData.characters[i]));
        }
    }

    /**
     * The list of all the characters
     * @type {Array.<Character>}
     * @readonly
     */
    get Characters() {
        return this._characters;
    }

    /**
     * Finds a character by its id
     * @param {number} id the id of the character 
     * @returns {Character}
     */
    FindById(id) {
        return this._characters.find(x => x.ActorID === id);
    }

    /**
     * Finds a character by its name
     * @param {string} name The name of the character 
     * @returns {Character}
     */
    FindByName(name) {
        return this._characters.find(x => x.Name.toUpperCase() === name.toUpperCase());
    }
}

module.exports = new CharacterManager();