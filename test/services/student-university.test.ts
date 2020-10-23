import assert from 'assert';
import app from '../../src/app';

describe('\'student-university\' service', () => {
  it('registered the service', () => {
    const service = app.service('student-university');

    assert.ok(service, 'Registered the service');
  });
});
