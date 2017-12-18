const loc = require("../managers/localizationManager");

const TOOLTIP_REGEX = new RegExp(/{[0-9]}([^{]*){-}|\^[0-9]([^\^]*)\^-|{([^}]*)}/, 'g');
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

    /**
     * @type {number}
     * @readonly
     */
    get ActorID() {
        return this._typeId;
    }

    /**
     * @type {string}
     * @readonly
     */
    get Name() {
        return this._name;
    }

    /**
     * @type {string}
     * @readonly
     */
    get DevName() {
        return this._devName;
    }

    /**
     * @type {string}
     * @readonly
     */
    get Title() {
        return this._title;
    }

    /**
     * @type {string}
     * @readonly
     */
    get Description() {
        return this._description;
    }

    /**
     * @type {Array.<Battlerite>}
     * @readonly
     */
    get Battlerites() {
        return this._battlerites;
    }

    /**
     * @type {Array.<Ability>}
     * @readonly
     */
    get Abilities() {
        return this._abilities;
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
        /** @type {TooltipData} */
        this._tooltipData = new TooltipData(data.tooltipData);
    }

    /**
     * The name of the current ability
     * @type {string}
     * @readonly
     */
    get Name()  {
        return this._name;
    }

    /**
     * The localized description
     * @type {string}
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
                let description = valueName;
                if (value && value.LocalizedDescription != "{None}") {
                    description = value.LocalizedDescription;
                }
                tempDescription = tempDescription.replace(matchedValue, description);

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
        /** @type {TooltipData} */
        this._tooltipData = new TooltipData(data.tooltipData);
    }

    /**
     * The localized description of the Battlerite
     * @type {string}
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

                const value = this._tooltipData._nodes.find(x => x._name.toUpperCase() == valueName.toUpperCase());

                tempDescription = tempDescription.replace(matchedValue, value ? value.LocalizedDescription : valueName);

                match = TOOLTIP_REGEX.exec(stringToMatch);
            }

            this._localizedDescription = tempDescription;
        }
        return this._localizedDescription;
    }
}

class TooltipData {
    /**
     * @constructor
     * @param {object} data The battlerite data sent from the server 
     */
    constructor(data) {
        /** @type {Array.<TooltipNode} */
        this._nodes = [];
        for (let i = 0; i < data.length; i++) {
            this._nodes.push(new TooltipNode(data[i]));
        }
    }

    /**
     * @type {Array.<TooltipNode>}
     * @readonly
     */
    get Nodes() {
        return this._nodes;
    }
}

class TooltipNode {
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

    /**
     * The localized description of the value
     * @type {string}
     * @readonly
     */
    get LocalizedDescription() {
        if (!this._localizedDescription) {
            const valueBeforeUnitType = this._valueType === `RangeValue` ? `${this._value} - ${this._maxValue}` : this._value;
            switch (this._unitType) {
                case `ModifierPercent`:
                case `Percent`:
                    this._localizedDescription = `${valueBeforeUnitType}%`;
                    break;
                case `Second`:
                    this._localizedDescription = `${valueBeforeUnitType} seconds`;
                    break;
                default:
                    this._localizedDescription = valueBeforeUnitType;
            }
        }
        return this._localizedDescription
    }
}

module.exports = Character;