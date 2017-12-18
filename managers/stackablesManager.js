const stackables = require("../data/stackables.json");
const loc = require("../managers/localizationManager");

class StackablesManager {
    constructor() {
        this._stackableMappings = {};
        for (let i = 0; i < stackables.Mappings.length; i++) {
            const stackableMapping = new StackableMapping(stackables.Mappings[i]);
            this._stackableMappings[stackableMapping.StackableId] = stackableMapping;
        }
    }

    /**
     * Return the stackable mapping associated to that id
     * @param {number} id The stackable id
     * @returns {StackableMapping}
     */
    Get(id) {
        return this._stackableMappings[id];
    }
}

class StackableMapping {
    constructor(data) {
        this._localizedName = loc.Get(data.LocalizedName);
        this._devName = data.DevName;
        this._idRangeName = data.IdRangeName;
        this._stackableRangeName = data.StackableRangeName;
        this._stackableId = data.StackableId;
        this._iconId = data.Icon;
        this._wideIconId = data.WideIconId;
    }

    /**
     * @type {number}
     * @readonly
     */
    get StackableId() {
        return this._stackableId;
    }
}

module.exports = new StackablesManager();