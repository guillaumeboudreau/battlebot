/* Modules */
const request = require("snekfetch");
const config = require("../config.json");

/* Models */
const Player = require("../models/player");

/* Constants */
const API_KEY = config.apiKey;
const REQUEST_OPTIONS = { headers: { Authorization: `Bearer ${API_KEY}`, Accept: `application/vnd.api+json` } };
const BASE_API_URL = `https://api.dc01.gamelockerapp.com/shards/global`;
const PLAYER_API_URL = `${BASE_API_URL}/players`;

class RequestManager {
    /**
     * Returns a player by its id
     * @async
     * @param {string} id The id of the player 
     * @returns {Promise<Player>}
     */
    async GetPlayerById(id) {
        return new Promise((resolve, reject) => {
            const url = `${PLAYER_API_URL}/${id}`;
            request.get(url, REQUEST_OPTIONS).then(r => {
                if (r.ok) {
                    resolve(new Player(r.body.data));
                } else {
                    resolve(null);
                }
            }, f => {
                resolve(null);
            });
        });
    }

    /**
    * Returns a player by its name
    * @async
    * @param {string} name The name of the player 
    * @returns {Promise<Player>}
    */
    async GetPlayerByName(name) {
        const players = await this.GetPlayersByNames([name]);
        return Promise.resolve(players[0]);
    }

    /**
    * Returns an array of players by their name
    * @async
    * @param {Array.<string>} names The names of the players 
    * @returns {Promise<Array.<Player>>}
    */
    async GetPlayersByNames(names) {
        return new Promise((resolve, reject) => {
            const url = `${PLAYER_API_URL}?filter[playerNames]=${names.join(`,`)}`;
            request.get(url, REQUEST_OPTIONS).then(r => {
                if (r.ok) {
                    const players = [];
                    for (let i = 0; i < r.body.data.length; i++) {
                        players.push(r.body.data[i]);
                    }
                    resolve(players);
                } else {
                    resolve(null);
                }
            }, f => {
                resolve(null);
            });
        });
    }

}

module.exports = new RequestManager();