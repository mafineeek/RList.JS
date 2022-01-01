const fetch = require('node-fetch');
const { Headers } = require('node-fetch');
const { EventEmitter } = require('events');

module.exports = class Bot extends EventEmitter{

    /**
     * 
     * @param {String} token Server-side generated token, can be found in Edit page of bot on list.r0adster.live 
     * @param {*} id Discord ID of bot account.
     */

    constructor(token, id){
        super();
        this.token = token;
        this.id = id;
    }

    /**
     * 
     * @param {String} method HTTP Method
     * @param {String} path Path to api request
     * @param {Object} body POST/PUT/PATCH Body payload 
     * @returns {any}
     * @private 
     */

    async _request(method, path, body) {
        const headers = new Headers();
        if (this.token) headers.set("Authorization", this.token);
        if (method !== "GET") headers.set("Content-Type", "application/json");

        let url = `https://list.r0adster.live/api${path}`;

        if (body && method === "GET") url += `?${new URLSearchParams(body)}`;

        const response = await fetch(url, {
        method,
        headers,
        body: body && method !== "GET" ? JSON.stringify(body) : undefined,
        });

        let responseBody;
        if (response.headers.get("Content-Type")?.startsWith("application/json")) {
        responseBody = await response.json();
        } else {
        responseBody = await response.text();
        }

        if (!response.ok) {
        throw new Error(response)
        }

        return responseBody;
    }

    /**
     * 
     * @param {Object} stats 
     * @returns {Object} Stats sent to server
     * @example
     * ```js
     * await client.postStats({guilds: 1500, users: 85333})
     * ==> {guilds: 1500, users: 85333}
     * ```
     */

    async postStats(stats){
        if(!stats || !stats.guilds && !stats.users) throw new Error('Missing stats')

        await this._request('POST', `/stats/${this.id}`, {
            guilds: stats.guilds,
            users: stats.users
        });

        return stats
    }

    /**
     * 
     * @param {String} botID 
     * @param {String} userID 
     * @returns {Promise<Object>} Info about provided user, and vote data
     * @example
     * ```js
     * await client.userVoted('911542985727025173', '854342480019587133')
     * // ==> { user: '854342480019587133', hasvote: false }
     * ```
     */

    async userVoted(botID, userID){
        if(!userID || !botID) throw new Error('Missing arguments [userVoted]') 

        return this._request('GET', `/${botID}/voted/${userID}`);
    }

}