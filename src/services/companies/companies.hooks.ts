import * as authentication from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';
import { ServiceModels } from '../../declarations';
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
        service: 'company-city',
        sourceField: 'companyId',
        targetField: 'cityId',
        dataField: 'citiesIds',
      }),
    ],
    find: [],
    get: [],
    create: [createCompanyUser()],
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

function createCompanyUser() {
  return async (context: HookContext<ServiceModels['companies']>) => {
    const { app, result, data } = context;
    const record = result && result.dataValues ? result.dataValues : result;

    if (!record || !data || !data.user) {
      return context;
    }

    const user = await app.service('users').create({ ...data.user, companyId: record.id });

    return context;
  };
}
