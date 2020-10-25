import * as authentication from '@feathersjs/authentication';
import createUser from '../../hooks/create-user';
import search from '../../hooks/search';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [],
    find: [search({ fields: ['name'] })],
    get: [],
    create: [createUser({ role: 'university' })],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [createUser({ role: 'university' })],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
