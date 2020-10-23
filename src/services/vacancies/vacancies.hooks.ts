import * as authentication from '@feathersjs/authentication';
import search from '../../hooks/search';
import setManyAssociation from '../../hooks/set-many-association';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [search({ fields: ['title', 'description'] })],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [
      setManyAssociation({
        service: 'vacancy-specialization',
        sourceField: 'vacancyId',
        targetField: 'specializationId',
        dataField: 'specializationsIds',
      }),

      setManyAssociation({
        service: 'university-vacancy',
        sourceField: 'vacancyId',
        targetField: 'universityId',
        dataField: 'universitiesIds',
      }),
    ],
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
