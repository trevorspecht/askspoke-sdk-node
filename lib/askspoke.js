'use strict';

const got = require('got');
const AWS = require('aws-sdk');


class AskSpoke {

  /** This class creates a new askSpoke API client
   * https://askspoke.com/api/reference
   * @constructor
   * @param {string} askSpokeToken - askSpoke API access token
   * @example <caption>Example askSpoke class usage</caption>
   * const AskSpoke = require('@trevorspecht/node-askSpoke');
   * const askSpoke = new AskSpoke(askSpokeToken);
   */
  constructor(askSpokeToken) {
    this.askSpokeToken = askSpokeToken;
    this.apiUrl = 'https://api.askSpoke.com/api/v1';
  }

  /** This function makes a GET request to the askSpoke /request_types endpoint
   * @param {Object} params - JSON query parameter object
   * @example <caption>Example listRequestTypes usage</caption>
   * const requestTypeList = await askSpoke.listRequestTypes(params);
   * @returns {Promise.object} - JSON response object
   * @see https://askSpoke.com/api/reference#operation/getRequestTypes
   */
  async listRequestTypes(params) {
    const apiKey = this.askSpokeToken;
    const options = {
      url: `${this.apiUrl}/request_types/`,
      json: true,
      headers: {
        'Api-Key': apiKey
      },
      query: params
    };

    try {
      const response = await got.get(options);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** This function makes a GET request to the AskSpoke /teams endpoint
   * @param {Object} params - JSON query parameter object
   * @example <caption>Example listTeams usage</caption>
   * const teamList = await askSpoke.listTeams(params);
   * @returns {Promise.object} - JSON response object
   * see AskSpoke API "List teams" docs
   */
  async listTeams(params) {
    const apiKey = this.askSpokeToken;
    const options = {
      url: `${this.apiUrl}/teams/`,
      json: true,
      headers: {
        'Api-Key': apiKey
      },
      query: params
    };

    try {
      const response = await got.get(options);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** This function makes a GET request to the AskSpoke /users endpoint
   * @param {Object} params - JSON query parameter object
   * @example <caption>Example listUsers usage</caption>
   * const userList = await askSpoke.listUsers(params);
   * @returns {Promise.object} - JSON response object
   * see AskSpoke API "List users" docs
   */
  async listUsers(params) {
    const apiKey = this.askSpokeToken;
    const options = {
      url: `${this.apiUrl}/users/`,
      json: true,
      headers: {
        'Api-Key': apiKey
      },
      query: params
    };

    try {
      const response = await got.get(options);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** This function makes a GET request to the AskSpoke /requests endpoint
   * @param {string} requestId - AskSpoke request ID (required)
   * @example <caption>Example getRequest usage</caption>
   * const request = await askSpoke.getRequest(requestId);
   * @returns {Promise.object} response - JSON response object
   * see AskSpoke API "Get a request" docs
   */
  async getRequest(requestId) {
    const apiKey = this.askSpokeToken;
    const options = {
      baseUrl: `${this.apiUrl}/requests/`,
      json: true,
      headers: {
        'Api-Key': apiKey
      }
    };

    try {
      const response = await got.get(requestId, options);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** This function makes a GET request to the AskSpoke /requests endpoint
   * @param {Object} params - JSON query parameter object
   * @example <caption>Example listRequests usage</caption>
   * const requestList = await askSpoke.listRequests(params);
   * @returns {Promise.object} response - JSON request(s) object
   * see AskSpoke API "List requests" docs
   */
  async listRequests(params) {
    const apiKey = this.askSpokeToken;
    const options = {
      url: `${this.apiUrl}/requests/`,
      json: true,
      headers: {
        'Api-Key': apiKey
      },
      query: params
    };

    try {
      const response = await got.get(options);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** This function makes a POST request to the AskSpoke /requests endpoint
   * @param {Object} request - JSON request body schema
   * @param {string} request.subject - request subject (required)
   * @param {string} request.requester - requester (required)
   * @param {string} request.body - request body
   * @param {string} request.team - request assigned team
   * @example <caption>Example postRequest usage</caption>
   * const response = await askSpoke.postRequest(request);
   * @returns {Promise.object} response - JSON response object
   * see AskSpoke API "Create new request" docs
   */
  async postRequest(request) {
    const apiKey = this.askSpokeToken;
    const options = {
      url: `${this.apiUrl}/requests/`,
      json: true,
      headers: {
        'Api-Key': apiKey
      },
      body: request
    };
    try {
      const response = await got.post(options);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** This function makes a PATCH request to the AskSpoke /teams/{teamId} endpoint
   * @param {string} teamId - team ID (required)
   * @param {Object} params - JSON request body schema
   * @param {string} params.settings.delegation.strategy - Team delegation strategies
   * @param {Array} params.settings.delegation.excludedUsers - user ids of excluded users, valid only for ROUND_ROBIN strategy
   * @param {string} params.settings.delegation.specifiedUser - user id, valid only for SPECIFIC_USER strategy
   * @example <caption>Example updateTeam usage</caption>
   * const response = await askSpoke.updateTeam(teamID, params);
   * @returns {Promise.object} response - JSON response object
   * see AskSpoke API "Update a team" docs
   */
  async updateTeam(teamId, params) {
    const apiKey = this.askSpokeToken;
    const options = {
      url: `${this.apiUrl}/${teamId}`,
      json: true,
      headers: {
        'Api-Key': apiKey
      },
      body: params
    };
    try {
      const response = await got.patch(params, options);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = AskSpoke;
