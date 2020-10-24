import assert from 'assert';
import app from '../../src/app';

describe('\'vacancy-tag\' service', () => {
  it('registered the service', () => {
    const service = app.service('vacancy-tag');

    assert.ok(service, 'Registered the service');
  });
});
