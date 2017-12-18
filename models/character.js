const loc = require("../managers/localizationManager");

const TOOLTIP_REGEX = new RegExp(/{[2]}([^{]*){-}|\^[2]([^\^]*)\^-|{([^}]*)}/, 'g');
const EXTERNAL_INDEX = 1;
const INTERNAL_INDEX = 2;
const DEFAULT_INDEX = 3;

class Character {
    /**
     * @constructor
     * @param {object} data The character data sent from the server 
     */
    constructor(data) {
        /** @type {number} */
        this._typeId = data.typeID;
        /** @type {string} */
        this._name = loc.Get(data.name);
        /** @type {string} */
        this._devName = data.devName;
        /** @type {string} */
        this._title = loc.Get(data.title);
        /** @type {string} */
        this._description = loc.Get(data.description);
        /** @type {string} */
        this._iconId = data.icon;
        /** @type {string} */
        this._wideIconId = data.wideIcon;
        /** @type {Array.<Battlerite>} */
        this._battlerites = [];
        for (let i = 0; i < data.battlerites.length; i++) {
            this._battlerites.push(new Battlerite(data.battlerites[i]));
        }
        /** @type {Array.<Ability>} */
        this._abilities = [];
        for (let i = 1; i < 8; i++) {
            this._abilities.push(new Ability(data["ability" + i]));
        }
    }
}

class Ability {
    /**
    * @constructor
    * @param {object} data The ability data sent from the server 
    */
    constructor(data) {
        /** @type {number} */
        this._typeId = data.typeID;
        /** @type {string} */
        this._name = loc.Get(data.name);
        /** @type {string} */
        this._description = loc.Get(data.description);
        /** @type {string} */
        this._iconId = data.icon;
        /** @type {string} */
        this._icon128Id = data.icon128;
        /** @type {BattleriteTooltipData} */
        this._tooltipData = new BattleriteTooltipData(data.tooltipData);
    }

    /**
     * @returns {string} The localized description
     * @readonly
     */
    get LocalizedDescription() {
        if (!this._localizedDescription) {
            let tempDescription = this._description;
            const stringToMatch = this._description;
            let match = TOOLTIP_REGEX.exec(stringToMatch);
            while (match != null) {
                const matchedValue = match[0];
                const valueName = match[DEFAULT_INDEX] || match[EXTERNAL_INDEX] || match[INTERNAL_INDEX];

                let value = this._tooltipData._nodes.find(x => x._name.toUpperCase() == valueName.toUpperCase());
                if (!value) {
                    value = { _value: valueName };
                }
                tempDescription = tempDescription.replace(matchedValue, value._value);

                match = TOOLTIP_REGEX.exec(stringToMatch);
            }

            this._localizedDescription = tempDescription;
        }
        return this._localizedDescription;
    }
}

class Battlerite {
    /**
     * @constructor
     * @param {object} data The battlerite data sent from the server 
     */
    constructor(data) {
        /** @type {number} */
        this._typeId = data.typeID;
        /** @type {string} */
        this._name = loc.Get(data.name);
        /** @type {string} */
        this._description = loc.Get(data.description);
        /** @type {string} */
        this._iconId = data.icon;
        /** @type {number} */
        this._abilitySlot = Number.parseInt(data.abilitySlot);
        /** @type {BattleriteTooltipData} */
        this._tooltipData = new BattleriteTooltipData(data.tooltipData);
    }

    get LocalizedDescription() {
        if (!this._localizedDescription) {
            let tempDescription = this._description;
            const stringToMatch = this._description;
            let match = TOOLTIP_REGEX.exec(stringToMatch);
            while (match != null) {
                const matchedValue = match[0];
                const valueName = match[DEFAULT_INDEX] || match[EXTERNAL_INDEX] || match[INTERNAL_INDEX];

                let value = this._tooltipData._nodes.find(x => x._name.toUpperCase() == valueName.toUpperCase());
                if (!value) {
                    value = { _value: valueName };
                }
                tempDescription = tempDescription.replace(matchedValue, value._value);

                match = TOOLTIP_REGEX.exec(stringToMatch);
            }

            this._localizedDescription = tempDescription;
        }
        return this._localizedDescription;
    }
}

class BattleriteTooltipData {
    /**
     * @constructor
     * @param {object} data The battlerite data sent from the server 
     */
    constructor(data) {
        /** @type {Array.<BattleriteTooltipNode} */
        this._nodes = [];
        for (let i = 0; i < data.length; i++) {
            this._nodes.push(new BattleriteTooltipNode(data[i]));
        }
    }
}

class BattleriteTooltipNode {
    constructor(data) {
        /** @type {string} */
        this._localizedName = loc.Get(data.LocalizedName);
        /** @type {string} */
        this._value = loc.Get(data.Value);
        /** @type {string} */
        this._valueType = data.ValueType;
        /** @type {string} */
        this._maxValue = data.MaxValue;
        /** @type {string} */
        this._name = data.Name;
        /** @type {number} */
        this._sortID = data.SortID;
        /** @type {string} */
        this._unitType = data.UnitType;
    }

    get LocalizedDescription() {

    }
}

module.exports = Character;