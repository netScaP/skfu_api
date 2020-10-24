import * as authentication from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';
import { ServiceModels } from '../../declarations';
import createUser from '../../hooks/create-user';
import includes from '../../hooks/includes';
import search from '../../hooks/search';
import setManyAssociation from '../../hooks/set-many-association';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const joins = [
  {
    uniqueName: 'user',
    model: 'users',
    required: false,
  },
];
const defaultJoins = {
  user: true,
};

export default {
  before: {
    all: [authenticate('jwt'), includes({ joins, defaultJoins })],
    find: [search({ queries: ['CONCAT("students"."firstName", \' \' ,"students"."lastName")'] })],
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
      setUniversities(),
    ],
    find: [],
    get: [],
    create: [createUser({ role: 'student' })],
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

function setUniversities() {
  return async (context: HookContext<ServiceModels['students']>) => {
    const { app, data, result, method } = context;
    const record = result && result.dataValues ? result.dataValues : result;

    if (method === 'find') {
      return context;
    }
    if (!record) {
      return context;
    }

    if (data && data.universitiesIds) {
      await app.service('student-university').remove(null, { query: { studentId: record.id } });

      await Promise.all(
        data.universitiesIds.map(async universityInfo => {
          const uniData = {
            studentId: record.id,
            universityId: universityInfo.universityId,
            specializationId: universityInfo.specializationId,
            enterDate: universityInfo.enterDate,
            endDate: universityInfo.endDate,
            description: universityInfo.description,
          };
          return await app.service('student-university').create(uniData);
        })
      );
    }

    const universities = await app.service('student-university').find({
      query: {
        studentId: record.id,
      },
      paginate: false,
    });

    record.universitiesIds = universities;

    return context;
  };
}
