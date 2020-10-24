import * as authentication from '@feathersjs/authentication';
import * as commonHooks from 'feathers-hooks-common';

import createTags from '../../hooks/create-tags';
import createUser from '../../hooks/create-user';
import includes from '../../hooks/includes';
import search from '../../hooks/search';
import setManyAssociation from '../../hooks/set-many-association';

import { HookContext, Id } from '@feathersjs/feathers';
import { ServiceModels } from '../../declarations';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;
const { alterItems } = commonHooks;

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
    find: [
      search({ queries: ['CONCAT("students"."firstName", \' \' ,"students"."lastName")'] }),
      studentFilters(),
    ],
    get: [],
    create: [createTags(), createUser({ role: 'student' })],
    update: [createTags()],
    patch: [createTags()],
    remove: [],
  },

  after: {
    all: [
      setManyAssociation({
        service: 'student-tag',
        sourceField: 'studentId',
        targetField: 'tagId',
        dataField: 'tagsIds',
      }),
      alterItems(getTags),
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
    all: [
      (context: HookContext) => {
        console.log(context.error);
      },
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};

function studentFilters() {
  return async (context: HookContext<ServiceModels['students']>) => {
    const {
      app,
      params: { query },
    } = context;
    const sequelizeClient = app.get('sequelizeClient');

    if (!query) {
      return context;
    }

    if (query.tags) {
      query.$or = query.$or || [];
      query.$or = query.$or.concat(
        query.tags.map((tag: string) =>
          sequelizeClient.literal(`(
            SELECT CASE WHEN EXISTS (
              SELECT *
                FROM "tags"
                LEFT OUTER JOIN "student_tag" ON "student_tag"."studentId" = "students"."id" AND "student_tag"."tagId" = "tags"."id"
                WHERE "tags"."name" iLike '%${tag}%'
            )
            THEN TRUE
            ELSE FALSE
            END
          )`)
        )
      );
      delete query.tags;
    }

    return context;
  };
}

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

async function getTags(student: ServiceModels['students'], context: HookContext) {
  const { app } = context;
  const record = student && student.dataValues ? student.dataValues : student;

  if (!record) {
    return student;
  }

  const service = `student-tag`;
  const idField = `studentId`;

  const tagsIds = (<{ tagId: Id }[]>await app.service(service).find({
    query: {
      [idField]: record.id,
    },
    paginate: false,
  })).map(e => e.tagId);

  const tags = <ServiceModels['tags'][]>await app.service('tags').find({
    query: {
      id: { $in: tagsIds },
    },
    paginate: false,
  });

  record.tags = tags.map(e => e.name);

  return student;
}
