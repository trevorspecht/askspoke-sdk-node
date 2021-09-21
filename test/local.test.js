'use strict';

const Spoke = require('../lib/spoke.js');
const spoke = new Spoke('general/IT/spoke/it-admin-api-token/');


const main = async () => {
  // const requestType = 'Account Deprovisioning Alert';
  // const response = await spoke.listRequestTypes(query);
  // const response = await spoke.postRequest(requestOpts);

  const listTeamParams = {
    q: 'Information Technology',
    ai: true
  };
  const listTeamsResponse = await spoke.listTeams(listTeamParams);
  const teamId = listTeamsResponse.body.results[0].id;

  const listUsersParams = {
    q: 'trevor.specht@mapbox.com'
  };
  const listUsersResponse = await spoke.listUsers(listUsersParams);
  const userId = listUsersResponse.body.results[0].id;

  // const response = await spoke.listRequests(query);
  // const response = await spoke.getRequest('124');

  const updateTeamParams = {
    'settings': {
      'delegation': {
        'strategy': 'SPECIFIC_USER',
        'specificUser': userId, // ignored when strategy is ROUND_ROBIN
        'excludedUsers': [ // ignored when strategy is SPECIFIC_USER
          '{user ID}'
        ]
      }
    }
  };
  const updateTeamResponse = await spoke.updateTeam(teamId, updateTeamParams);


  console.log(
    `Team ${listTeamsResponse.body.results[0].name} 
    user delegatation changed to ${updateTeamResponse.body.settings.delegation.strategy} 
    with user ${listUsersResponse.body.results[0].displayName}.`
  );
};


// main(spokeSecretPrefix);


const tagRequest = async () => {
  const requestId = '60ad202xxxxxx006bf8b39';
  const params = {
    'tags': [
      {
        '_id': '6054ebc5xxxxxx006f42f22'
      },
      {
        '_id': '6054ebcxxxxx0006ead202'
      }
    ]
  };
  const response = await spoke.addTags(requestId, params);
  console.log(response);
};

// tagRequest();


const removeTag = async (requestId, tagId) => {
  const response = await spoke.removeTags(requestId, tagId);
  console.log(response);
};

removeTag('60ad20xxxxxx06bf8b39', '6054ebxxxxxx0006ead202');