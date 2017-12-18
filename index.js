async function main() {
    const userId = `930523139249729536`;

    const DEFAULT_LANGUAGE = `english`;
    const loc = require("./managers/localizationManager");
    await loc.LoadLanguage(DEFAULT_LANGUAGE);

    const requestManager = require("./managers/requestManager")

    const player = await requestManager.GetPlayerById(userId);

    const ruthenium = await requestManager.GetPlayerByName("Ruthenium");
}

main();