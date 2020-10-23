import assert from 'assert';
import app from '../../src/app';

describe('\'vacancy-specialization\' service', () => {
  it('registered the service', () => {
    const service = app.service('vacancy-specialization');

    assert.ok(service, 'Registered the service');
  });
});
