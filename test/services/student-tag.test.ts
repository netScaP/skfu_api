import assert from 'assert';
import app from '../../src/app';

describe('\'student-tag\' service', () => {
  it('registered the service', () => {
    const service = app.service('student-tag');

    assert.ok(service, 'Registered the service');
  });
});
