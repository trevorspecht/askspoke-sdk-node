'use strict';
// const got = require('got');
const test = require('tape');
const sinon = require('sinon');
const AWS = require('@mapbox/mock-aws-sdk-js');
const Spoke = require('../index.js');

const fakeSecretPath = 'general/IT/spoke/123';


test('[spoke] constructor', (assert) => {
  const spoke = new Spoke(fakeSecretPath);
  assert.ok(spoke, 'created spoke object'); // 1
  assert.equal(spoke.secretPrefix, fakeSecretPath, 'returned expected prefix value'); // 2
  assert.end();
});

test('[spoke] token cached', async (assert) => {
  const spoke = new Spoke(fakeSecretPath);
  spoke._cache.token = '123';
  assert.equal(await spoke.token(), '123', 'returned expected cached token value');
  assert.end();
});

test('[spoke] token not cached', async (assert) => {
  const spoke = new Spoke(fakeSecretPath);
  AWS.stub('SecretsManager', 'getSecretValue', function() {
    this.request.promise.resolves({ SecretString: '123' });
  });
  assert.equal(await spoke.token(), '123', 'returned expected token value');
  assert.equal(spoke._cache.token, '123', 'token is set in cache');
  AWS.SecretsManager.restore();
  assert.end();
});

test('[spoke] listRequestTypes', async (assert) => {
  const spokeStub = sinon.spy(() => {
    return sinon.createStubInstance(Spoke);
  });
  const spoke = new spokeStub(fakeSecretPath);
  assert.ok(spokeStub.calledWithNew, 'spoke stub instantiated');
  assert.ok(spoke.listRequestTypes, 'spoke method verified');

  sinon.restore();
  assert.end();
});

test('[spoke] listTeams', async (assert) => {
  const spokeStub = sinon.spy(() => {
    return sinon.createStubInstance(Spoke);
  });
  const spoke = new spokeStub(fakeSecretPath);
  assert.ok(spokeStub.calledWithNew, 'spoke stub instantiated');
  assert.ok(spoke.listTeams, 'spoke method verified');
  sinon.restore();
  assert.end();
});

test('[spoke] listUsers', async (assert) => {
  const spokeStub = sinon.spy(() => {
    return sinon.createStubInstance(Spoke);
  });
  const spoke = new spokeStub(fakeSecretPath);
  assert.ok(spokeStub.calledWithNew, 'spoke stub instantiated');
  assert.ok(spoke.listUsers, 'spoke method verified');
  sinon.restore();
  assert.end();
});

test('[spoke] getRequest', async (assert) => {
  const spokeStub = sinon.spy(() => {
    return sinon.createStubInstance(Spoke);
  });
  const spoke = new spokeStub(fakeSecretPath);
  assert.ok(spokeStub.calledWithNew, 'spoke stub instantiated');
  assert.ok(spoke.getRequest, 'spoke method verified');
  sinon.restore();
  assert.end();
});

test('[spoke] listRequests', async (assert) => {
  const spokeStub = sinon.spy(() => {
    return sinon.createStubInstance(Spoke);
  });
  const spoke = new spokeStub(fakeSecretPath);
  assert.ok(spokeStub.calledWithNew, 'spoke stub instantiated');
  assert.ok(spoke.listRequests, 'spoke method verified');
  sinon.restore();
  assert.end();
});

test('[spoke] postRequest', async (assert) => {
  const spokeStub = sinon.spy(() => {
    return sinon.createStubInstance(Spoke);
  });
  const spoke = new spokeStub(fakeSecretPath);
  assert.ok(spokeStub.calledWithNew, 'spoke stub instantiated');
  assert.ok(spoke.postRequest, 'spoke method verified');
  sinon.restore();
  assert.end();
});

test('[spoke] updateTeam', async (assert) => {
  const spokeStub = sinon.spy(() => {
    return sinon.createStubInstance(Spoke);
  });
  const spoke = new spokeStub(fakeSecretPath);
  assert.ok(spokeStub.calledWithNew, 'spoke stub instantiated');
  assert.ok(spoke.updateTeam, 'spoke method verified');
  sinon.restore();
  assert.end();
});
