import assert from 'assert';
import app from '../../src/app';

describe('\'vacancies\' service', () => {
  it('registered the service', () => {
    const service = app.service('vacancies');

    assert.ok(service, 'Registered the service');
  });
});
