async function main() {
    const apiKey = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiZDIwYTJhMC1jMTAyLTAxMzUtODY2MS0wYTU4NjQ2MTA1NDgiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTEzMDM5MTI3LCJwdWIiOiJzdHVubG9jay1zdHVkaW9zIiwidGl0bGUiOiJiYXR0bGVyaXRlIiwiYXBwIjoiYmF0dGxlYm90LTMyODllMzU1LTdmNWItNDZkNi1iNTFjLTMyYmI0ZDgzYWY4OSIsInNjb3BlIjoiY29tbXVuaXR5IiwibGltaXQiOjEwfQ.ePwrXxs0RdOo3-ZzMge144lkCeqoA1Tb7RW2GABI2ww`;
    const userId = `930523139249729536`;
    const playerIdUrl = `https://api.dc01.gamelockerapp.com/shards/global/players/${userId}`;
    const DEFAULT_LANGUAGE = `english`;

    const loc = require("./managers/localizationManager");
    await loc.LoadLanguage(DEFAULT_LANGUAGE);
    
    const request = require("snekfetch");
    const Player = require("./models/player");
    const Test = require("./data/gameplay.json");

    console.log(Test.characters[0]);


    request.get(playerIdUrl, { headers: { Authorization: `Bearer ${apiKey}`, Accept: `application/vnd.api+json` } })
        .then(r => {
            const test = new Player(r.body.data);
            console.log(test);
        });
}

main();