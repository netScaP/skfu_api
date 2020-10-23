import * as authentication from '@feathersjs/authentication';
import includes from '../../hooks/includes';

const { authenticate } = authentication.hooks;

const joins = [
  {
    uniqueName: 'worker',
    model: 'workers',
    as: 'worker',
    required: false,
  },
  {
    uniqueName: 'vacancy',
    model: 'vacancies',
    as: 'vacancy',
    required: false,
  },
  {
    uniqueName: 'student',
    model: 'students',
    as: 'student',
    required: false,
  },
];
const defaultJoins = {
  worker: true,
  vacancy: true,
  student: true,
};

export default {
  before: {
    all: [authenticate('jwt'), includes({ joins, defaultJoins })],
    find: [],
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
