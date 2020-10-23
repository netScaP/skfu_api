import assert from 'assert';
import app from '../../src/app';

describe('\'company-city\' service', () => {
  it('registered the service', () => {
    const service = app.service('company-city');

    assert.ok(service, 'Registered the service');
  });
});
