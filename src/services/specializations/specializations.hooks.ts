import * as authentication from '@feathersjs/authentication';
import * as commonHooks from 'feathers-hooks-common';

import search from '../../hooks/search';
import setManyAssociation from '../../hooks/set-many-association';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;
const { disablePagination } = commonHooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [search({ fields: ['name'] }), disablePagination()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
