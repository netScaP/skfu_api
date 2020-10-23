import assert from 'assert';
import app from '../../src/app';

describe('\'universities\' service', () => {
  it('registered the service', () => {
    const service = app.service('universities');

    assert.ok(service, 'Registered the service');
  });
});
