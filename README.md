# askspoke-sdk-node
[WIP] A node.js SDK for the askSpoke API.

This is a work in progress. Current supported methods are listed in the Usage section below.

## Usage

```js
const Spoke = require('@mapbox/node-spoke');
const spoke = new Spoke('AWS_SECRET_PATH'); // path to Spoke API token stored in AWS Secrets Manager
```

**Requests**
```js
const request = await spoke.getRequest(<request ID>);
const request = await spoke.deleteRequest(<request ID>);
const response = await spoke.postRequest(<request parameters>);
const response = await spoke.updateRequest(requestId, params);
const response = await spoke.postMessage(requestId, message);
const requestList = await spoke.listRequests(<query parameters>);
```
**Teams**
```js
const teamList = await spoke.listTeams(<query parameters>);
const response = await spoke.updateTeam(teamID, params);
```
**Users**
```js
const userList = await spoke.listUsers(<query parameters>);
```
**Request Types**
```js
const requestTypeList = await spoke listRequestTypes(<query parameters>);
```
**Tags**
```js
const tagList = await spoke.listTags(<query parameters>);
const response = await spoke.addTags(requestId, params);
const response = await spoke.removeTags(requestId, tagId);
```
