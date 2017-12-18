const fs = require("fs");
const readline = require("readline");

class LocalizationManager {
    async LoadLanguage(language) {
        return new Promise((resolve, reject) => {
            this._keys = {};
            const lineReader = readline.createInterface({
                input: fs.createReadStream(`./data/${language}.ini`)
            });
            lineReader.on(`line`, (line) => {
                const splitLine = line.split(`=`);
                this._keys[splitLine[0]] = splitLine[1];
            });

            lineReader.on(`close`, () => {
                resolve();
            });
        });
    }

    /**
     * Gets a key in the current localisation
     * @param {string} key The key associated to the localization required 
     * @returns {string} The localized key or the key if there was no local associated
     */
    Get(key) {
        if (this._keys && this._keys[key]) {
            return this._keys[key];
        }
        return key;
    }
}

module.exports = new LocalizationManager();