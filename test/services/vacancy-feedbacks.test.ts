import assert from 'assert';
import app from '../../src/app';

describe('\'vacancy-feedbacks\' service', () => {
  it('registered the service', () => {
    const service = app.service('vacancy-feedbacks');

    assert.ok(service, 'Registered the service');
  });
});
