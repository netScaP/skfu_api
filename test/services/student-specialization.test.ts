import assert from 'assert';
import app from '../../src/app';

describe('\'student-specialization\' service', () => {
  it('registered the service', () => {
    const service = app.service('student-specialization');

    assert.ok(service, 'Registered the service');
  });
});
