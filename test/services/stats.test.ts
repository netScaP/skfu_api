import assert from 'assert';
import app from '../../src/app';

describe('\'stats\' service', () => {
  it('registered the service', () => {
    const service = app.service('stats');

    assert.ok(service, 'Registered the service');
  });
});
