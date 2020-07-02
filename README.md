# askspoke-sdk-node
[WIP] A node.js SDK for the askSpoke API.

This is a work in progress. Current supported methods are listed in the Usage section below.

## Usage

```
const Spoke = require('@trevorspecht/node-spoke');
const spoke = new Spoke('ASKSPOKE_API_TOKEN');

const request = await spoke.getRequest(<request ID>);
const response = await spoke.postRequest(<request parameters>);
const requestList = await spoke.listRequests(<query parameters>);
const teamList = await spoke.listTeams(<query parameters>);
const userList = await spoke.listUsers(<query parameters>);
const requestTypeList = await spoke listRequestTypes(<query parameters>);
const response = await spoke.updateTeam(teamID, params);
```