async function main() {
    const apiKey = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiZDIwYTJhMC1jMTAyLTAxMzUtODY2MS0wYTU4NjQ2MTA1NDgiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTEzMDM5MTI3LCJwdWIiOiJzdHVubG9jay1zdHVkaW9zIiwidGl0bGUiOiJiYXR0bGVyaXRlIiwiYXBwIjoiYmF0dGxlYm90LTMyODllMzU1LTdmNWItNDZkNi1iNTFjLTMyYmI0ZDgzYWY4OSIsInNjb3BlIjoiY29tbXVuaXR5IiwibGltaXQiOjEwfQ.ePwrXxs0RdOo3-ZzMge144lkCeqoA1Tb7RW2GABI2ww`;
    const userId = `930523139249729536`;
    const playerIdUrl = `https://api.dc01.gamelockerapp.com/shards/global/players/${userId}`;
    const DEFAULT_LANGUAGE = `english`;

    const loc = require("./managers/localizationManager");
    await loc.LoadLanguage(DEFAULT_LANGUAGE);

    const request = require("snekfetch");
    const Player = require("./models/player");
    const Character = require("./models/character");
    const gameplayData = require("./data/gameplay.json");
    const characters = [];
    for (let i = 0; i < gameplayData.characters.length; i++) {
        characters.push(new Character(gameplayData.characters[i]));
    }

    for (let i = 0; i < 1; i++) {
        console.log(characters[i]._name);
        for (let j = 0; j < characters[i]._abilities.length; j++) {
            console.log(characters[i]._abilities[j]._name);
            console.log(characters[i]._abilities[j].LocalizedDescription);
        }

        for (let k = 0; k < characters[i]._battlerites.length; k++) {
            console.log(characters[i]._battlerites[k]._name);
            console.log(characters[i]._battlerites[k].LocalizedDescription);
        }
    }
    /*
        request.get(playerIdUrl, { headers: { Authorization: `Bearer ${apiKey}`, Accept: `application/vnd.api+json` } })
            .then(r => {
                const test = new Player(r.body.data);
                console.log(test);
            });*/
}

main();