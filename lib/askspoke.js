'use strict';

const got = require('got');
const AWS = require('aws-sdk');


class Spoke {

  /** This class creates a new Spoke API client
   * https://askspoke.com/api/reference
   * @constructor
   * @param {string} secretPrefix - AWS Secrets Manager secret prefix with Spoke API access token
   * @const {string} token - Spoke API token
   * @const {Object} params - options object parameter for calling got()
   * @const {string} pathname - request path (appended to hostname URL)
   * @example <caption>Example Spoke class usage</caption>
   * const Spoke = require('@mapbox/node-spoke');
   * const spoke = new Spoke(secretPrefix);
   */
  constructor(secretPrefix) {
    this.secretPrefix = secretPrefix;
    this._cache = {
      token: undefined
    };
    this.searchParams = undefined;
    this.bodyParams = undefined;
  }

  /** This function uses the AWS SDK to look up the secret value for the supplied secret prefix
   * @param {string} secretPrefix - AWS Secrets Manager secret prefix
   * @returns {Promise.string} token - SecretSting value returned by Secrets Manager
   */
  async token() {
    if (this._cache.token) return this._cache.token;
    const sm = new AWS.SecretsManager({ region: 'us-east-1' });
    try {
      const data = await sm.getSecretValue({
        SecretId: `${this.secretPrefix}`
      }).promise();
      const token = data.SecretString;
      this._cache.token = token;
      return Promise.resolve(token);
    }
    catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * @const {Object} searchParams - query params object passed as argument to the calling function (used only in GET operations)
   * @const {Object} bodyParams - JSON body payload passed as argument to the calling function (used only in POST, PATCH operations)
   * @returns a custom got() instance
   */
  async gotClient () {
    const apiKey = await this.token();
    const instance = got.extend({
      prefixUrl: 'https://api.askspoke.com/api/v1/',
      responseType: 'json',
      headers: {
        'Api-key': apiKey
      },
      searchParams: this.searchParams,
      json: this.bodyParams
    });
    return instance;
  }

  /** This function makes a GET request to the Spoke /request_types endpoint
   * @param {Object} params - JSON query parameter object
   * @example <caption>Example listRequestTypes usage</caption>
   * const requestTypeList = await spoke.listRequestTypes(params);
   * @returns {Promise.object} - JSON response object
   * @see https://askspoke.com/api/reference#operation/getRequestTypes
   */
  async listRequestTypes(params) {

    const endpoint = 'request_types';
    this.searchParams = params;
    this.bodyParams = undefined;

    try {
      const client = await this.gotClient();
      const response = await client.get(endpoint);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** This function makes a GET request to the Spoke /teams endpoint
   * @param {Object} params - JSON query parameter object
   * @example <caption>Example listTeams usage</caption>
   * const teamList = await spoke.listTeams(params);
   * @returns {Promise.object} - JSON response object
   * see Spoke API "List teams" docs
   */
  async listTeams(params) {

    const endpoint = 'teams';
    this.searchParams = params;
    this.bodyParams = undefined;

    try {
      const client = await this.gotClient();
      const response = await client.get(endpoint);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** This function makes a GET request to the Spoke /users endpoint
   * @param {Object} params - JSON query parameter object
   * @example <caption>Example listUsers usage</caption>
   * const userList = await spoke.listUsers(params);
   * @returns {Promise.object} - JSON response object
   * see Spoke API "List users" docs
   */
  async listUsers(params) {

    const endpoint = 'users';
    this.searchParams = params;
    this.bodyParams = undefined;

    try {
      const client = await this.gotClient();
      const response = await client.get(endpoint);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** This function makes a GET request to the Spoke /requests endpoint
   * @param {string} requestId - Spoke request ID (required)
   * @example <caption>Example getRequest usage</caption>
   * const request = await spoke.getRequest(requestId);
   * @returns {Promise.object} response - JSON response object
   * see Spoke API "Get a request" docs
   */
  async getRequest(requestId) {

    const endpoint = `requests/${requestId}`;

    try {
      const client = await this.gotClient();
      const response = await client.get(endpoint);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** This function makes a DELETE request to the Spoke /requests endpoint
   * @param {string} requestId - Spoke request ID (required)
   * @example <caption>Example deleteRequest usage</caption>
   * const request = await spoke.deleteRequest(requestId);
   * @returns {Promise.object} response - JSON response object
   * see Spoke API "Delete a request" docs
   */
  async deleteRequest(requestId) {

    const endpoint = `requests/${requestId}`;

    try {
      const client = await this.gotClient();
      const response = await client.delete(endpoint);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** This function makes a GET request to the Spoke /requests endpoint
   * @param {Object} params - JSON query parameter object
   * @example <caption>Example listRequests usage</caption>
   * const requestList = await spoke.listRequests(params);
   * @returns {Promise.object} response - JSON request(s) object
   * see Spoke API "List requests" docs
   */
  async listRequests(params) {

    const endpoint = 'requests';
    this.searchParams = params;
    this.bodyParams = undefined;

    try {
      const client = await this.gotClient();
      const response = client.get(endpoint);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** This function makes a POST request to the Spoke /requests endpoint
   * @param {Object} request - JSON request body schema
   * @param {string} request.subject - request subject (required)
   * @param {string} request.requester - requester (required)
   * @param {string} request.body - request body
   * @param {string} request.team - request assigned team
   * @example <caption>Example postRequest usage</caption>
   * const response = await spoke.postRequest(request);
   * @returns {Promise.object} response - JSON response object
   * see Spoke API "Create new request" docs
   */
  async postRequest(request) {

    const endpoint = 'requests';
    this.bodyParams = request;
    this.searchParams = undefined;

    try {
      const client = await this.gotClient(endpoint);
      const response = await client.post(endpoint);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** This function posts a message to an existing Spoke request
   * @param {Object} params - JSON request body schema
   * @param {object} params.actor - *required* describes the actor making the update
   * @param {String} params.actor.kind - type of actor (typically, 'User')
   * @param {String} params.actor.ref - unique Spoke ID for the actor
   * @param {Object} params.content.message - *required* message content object
   * @param {String} params.content.message.text - text of the message to post
   * @param {String} requestId - *required* Spoke request ID (must be the full ID not the ID# derived from the permalink URL)
   * @example <caption>Example postMessage usage</caption>
   * const response = await spoke.postMessage(requestId, message);
   * @returns {Promise.object} response - JSON response object
   * see Spoke API [Post a message](https://askspoke.com/api/reference#operation/postRequestMessage) docs
   */
  async postMessage(requestId, params) {

    const endpoint = `requests/${requestId}/messages`;
    this.bodyParams = params;
    this.searchParams = undefined;

    try {
      const client = await this.gotClient();
      const response = await client.post(endpoint);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** This function makes a PATCH request to the Spoke /requests/{requestId} endpoint
   * @param {string} requestId - *required* Spoke request ID (must be the full ID not the ID# derived from the permalink URL)
   * @param {Object} params - JSON request body schema
   * @param {string} params.subject - request subject
   * @param {string} params.requester - requester
   * @param {string} params.owner - owner
   * @param {string} params.status - status
   * @param {string} params.requestType - request type ID
   * @param {Object} params.requestTypeInfo - requestTypeInfo object
   * @param {Array} params.requestTypeInfo.answeredFields - array of request field objects
   * @param {string} params.requestTypeInfo.answeredFields.fieldID - field ID
   * @param {string} params.requestTypeInfo.answeredFields.value - field value (content to be entered in field)
   * @param {Array} params.taskInstances - array of request task objects
   * @param {string} params.taskInstances.uuid - task ID
   * @param {string} params.taskInstances.owner - task owner
   * @param {string} params.taskInstances.status - task status
   * @param {string} params.taskInstances.dueDate - task due date
   * @param {string} params.privacyLevel - request privacy setting
   * @param {string} params.team - request assigned team
   * @example <caption>Example updateRequest usage</caption>
   * const response = await spoke.updateRequest(requestID, params);
   * @returns {Promise.object} response - JSON response object
   * see Spoke API [Update a request](https://askspoke.com/api/reference#operation/updateRequest) docs
   */
  async updateRequest(requestId, params) {

    const endpoint = `requests/${requestId}`;
    this.bodyParams = params;
    this.searchParams = undefined;

    try {
      const client = await this.gotClient();
      const response = await client.patch(endpoint);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** This function makes a PATCH request to the Spoke /teams/{teamId} endpoint
   * @param {string} teamId - team ID (required)
   * @param {Object} params - JSON request body schema
   * @param {string} params.settings.delegation.strategy - Team delegation strategies
   * @param {Array} params.settings.delegation.excludedUsers - user ids of excluded users, valid only for ROUND_ROBIN strategy
   * @param {string} params.settings.delegation.specifiedUser - user id, valid only for SPECIFIC_USER strategy
   * @example <caption>Example updateTeam usage</caption>
   * const response = await spoke.updateTeam(teamID, params);
   * @returns {Promise.object} response - JSON response object
   * see Spoke API "Update a team" docs
   */
  async updateTeam(teamId, params) {

    const endpoint = `teams/${teamId}`;
    this.bodyParams = params;
    this.searchParams = undefined;

    try {
      const client = await this.gotClient();
      const response = await client.patch(endpoint);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** This function makes a GET request to the Spoke /tags endpoint
   * @param {Object} params - JSON query parameter object
   * @example <caption>Example listTags usage</caption>
   * const tagList = await spoke.listTags(params);
   * @returns {Promise.object} - JSON response object
   * see Spoke API "List tags" docs
   */
  async listTags(params) {

    const endpoint = 'tags';
    this.searchParams = params;
    this.bodyParams = undefined;

    try {
      const client = await this.gotClient();
      const response = await client.get(endpoint);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Makes a PATCH request to the Spoke /requests/{requestId}/tags endpoint
   * @param {string} requestId - the request ID
   * @param {Object} params - JSON query parameter object
   * @returns {Promise.object} - JSON response object
   */
  async addTags(requestId, params) {

    const endpoint = `requests/${requestId}/tags`;
    this.bodyParams = params;
    this.searchParams = undefined;

    try {
      const client = await this.gotClient();
      const response = await client.patch(endpoint);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Makes a DELETE request to the Spoke /requests/{requestId}/tags/{tagId} endpoint
   * @param {string} requestId - the request ID
   * @param {string} tagId - JSON query parameter object
   * @returns {Promise.object} - JSON response object
   */
  async removeTags(requestId, tagId) {

    const endpoint = `requests/${requestId}/tags/${tagId}`;
    this.bodyParams = undefined;
    this.searchParams = undefined;

    try {
      const client = await this.gotClient();
      const response = await client.delete(endpoint);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = Spoke;
