import assert from 'assert';
import app from '../../src/app';

describe('\'university-vacancy\' service', () => {
  it('registered the service', () => {
    const service = app.service('university-vacancy');

    assert.ok(service, 'Registered the service');
  });
});
