import * as authentication from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';

import createUser from '../../hooks/create-user';
import search from '../../hooks/search';
import setManyAssociation from '../../hooks/set-many-association';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [],
    find: [authenticate('jwt'), search({ fields: ['name'] })],
    get: [authenticate('jwt')],
    create: [
      (context: HookContext) => {
        console.log(context.data);
      },
      createUser({ role: 'company' }),
    ],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')],
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
    create: [createUser({ role: 'company' })],
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
