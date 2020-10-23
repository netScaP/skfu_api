import assert from 'assert';
import app from '../../src/app';

describe('\'student-vacancy\' service', () => {
  it('registered the service', () => {
    const service = app.service('student-vacancy');

    assert.ok(service, 'Registered the service');
  });
});
