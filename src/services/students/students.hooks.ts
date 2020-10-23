import * as authentication from '@feathersjs/authentication';
import search from '../../hooks/search';
import setManyAssociation from '../../hooks/set-many-association';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [search({ queries: ['CONCAT("users"."firstName", \' \' ,"users"."lastName")'] })],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [
      setManyAssociation({
        service: 'student-specialization',
        sourceField: 'studentId',
        targetField: 'specializationId',
        dataField: 'specializationsIds',
      }),
      setManyAssociation({
        service: 'student-university',
        sourceField: 'studentId',
        targetField: 'universityId',
        dataField: 'univerisitiesIds',
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
