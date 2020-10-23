import assert from 'assert';
import app from '../../src/app';

describe('\'student-feedbacks\' service', () => {
  it('registered the service', () => {
    const service = app.service('student-feedbacks');

    assert.ok(service, 'Registered the service');
  });
});
