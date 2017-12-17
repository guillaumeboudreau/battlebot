class Player {
    /**
     * The type of the player, should always be "player"
     * @type {string} 
     * @readonly
     */
    get Type() {
        return this._type;
    }
    /**
     * The id of the player
     * @type {string}
     * @readonly
     */
    get Id() {
        return this._id;
    }
    /**
     * The attributes of the player
     * @type {PlayerAttributes}
     * @readonly
     */
    get Attributes() {
        return this._attributes;
    }
    /**
     * The relationships of the player object
     * @type {PlayerRelationships}
     * @readonly
     */
    get Relationships() {
        return this._relationships;
    }
    /**
     * The links of the player object
     * @type {PlayerLinks}
     * @readonly
     */
    get Links() {
        return this._type;
    }
    /**
     * @constructor
     * @param {object} data - The parsed data received by the Battlerite API
     */
    constructor(data) {
        this._type = data.type;
        this._id = data.id;
        this._attributes = new PlayerAttributes(data.attributes);
        this._relationships = new PlayerRelationships(data.relationships);
        this._links = new PlayerLinks(data.links);
    }
}

class PlayerAttributes {
    /**
     * The name of the player
     * @type {string}
     * @readonly
     */
    get Name() {
        return this._name;
    }
    /**
     * The patch version of the player
     * @type {string}
     * @readonly
     */
    get PatchVersion() {
        return this._patchVersion;
    }
    /**
     * The shardId of the player
     * @type {string}
     * @readonly
     */
    get ShardId() {
        return this._shardId;
    }
    /**
     * The stats of the player
     * @type {*}
     * @readonly
     */
    get Stats() {
        return this._stats;
    }
    /**
     * The titleId of the player
     * @type {string}
     * @readonly
     */
    get TitleId() {
        return this._titleId;
    }

    /**
     * @constructor
     * @param {object} data The data received by the Battlerite API 
     */
    constructor(data) {
        this._name = data.name;
        this._patchVersion = data.patchVersion;
        this._shardId = data.shardId;
        this._stats = data.stats;
        this._titleId = data.titleId;
    }
}

class PlayerStats {

}

class PlayerRelationships {
    /**
     * The assets of the relationship
     * @type {PlayerAssets}
     * @readonly
     */
    get Assets() {
        return this._assets;
    }

    /**
     * @constructor
     * @param {object} data The data received by the Battlerite API 
     */
    constructor(data) {
        this._assets = new PlayerAssets(data.assets);
    }
}

class PlayerAssets {
    /**
     * The assets of the player
     * @type {Array.<*>}
     * @readonly
     */
    get Data() {
        return this._data;
    }

    /**
     * @constructor
     * @param {object} data The data received by the Battlerite API 
     */
    constructor(data) {
        this._data = data.data;
    }
}

class PlayerLinks {
    /**
     * The schema of the player
     * @type {string}
     * @readonly
     */
    get Schema() {
        return this._schema;
    }
    /**
     * A reference to the request URL used to build this player
     * @type {string}
     * @readonly
     */
    get Self() {
        return this._self;
    }

    /**
     * @constructor
     * @param {object} data The data received by the Battlerite API 
     */
    constructor(data) {
        this._schema = data.schema;
        this._self = data.self;
    }
}

module.exports = Player;