import * as authentication from '@feathersjs/authentication';
import createUser from '../../hooks/create-user';
import search from '../../hooks/search';
import setManyAssociation from '../../hooks/set-many-association';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [search({ fields: ['name'] })],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [
      setManyAssociation({
        service: 'university-specialization',
        sourceField: 'universityId',
        targetField: 'specializationId',
        dataField: 'specializationsIds',
      }),
    ],
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
