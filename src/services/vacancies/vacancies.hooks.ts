import * as authentication from '@feathersjs/authentication';
import * as commonHooks from 'feathers-hooks-common';

import createTags from '../../hooks/create-tags';
import search from '../../hooks/search';
import setManyAssociation from '../../hooks/set-many-association';

import { HookContext, Id } from '@feathersjs/feathers';
import { ServiceModels } from '../../declarations';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;
const { alterItems } = commonHooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [search({ fields: ['title', 'description'] }), vacancyFilters()],
    get: [],
    create: [createTags()],
    update: [createTags()],
    patch: [createTags()],
    remove: [],
  },

  after: {
    all: [
      setManyAssociation({
        service: 'vacancy-tag',
        sourceField: 'vacancyId',
        targetField: 'tagId',
        dataField: 'tagsIds',
      }),

      setManyAssociation({
        service: 'university-vacancy',
        sourceField: 'vacancyId',
        targetField: 'universityId',
        dataField: 'universitiesIds',
      }),

      alterItems(getTags),
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

function vacancyFilters() {
  return async (context: HookContext<ServiceModels['vacancies']>) => {
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
                LEFT OUTER JOIN "vacancy_tag" ON "vacancy_tag"."vacancyId" = "vacancies"."id" AND "vacancy_tag"."tagId" = "tags"."id"
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

async function getTags(vacancy: ServiceModels['vacancies'], context: HookContext) {
  const { app } = context;
  const record = vacancy && vacancy.dataValues ? vacancy.dataValues : vacancy;

  if (!record) {
    return vacancy;
  }

  const service = `vacancy-tag`;
  const idField = `vacancyId`;

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

  return vacancy;
}
