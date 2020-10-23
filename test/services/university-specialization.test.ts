import assert from 'assert';
import app from '../../src/app';

describe('\'university-specialization\' service', () => {
  it('registered the service', () => {
    const service = app.service('university-specialization');

    assert.ok(service, 'Registered the service');
  });
});
