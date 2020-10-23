import assert from 'assert';
import app from '../../src/app';

describe('\'specializations\' service', () => {
  it('registered the service', () => {
    const service = app.service('specializations');

    assert.ok(service, 'Registered the service');
  });
});
