import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import { Id } from '@feathersjs/feathers';

export interface Data {
  id: Id;
  universityId: Id;
  specializationId: Id;
  createdAt: Date;
  updatedAt: Date;
}

declare module '../../declarations' {
  interface ServiceModels {
    'university-specialization': Data;
  }
}

export class UniversitySpecialization extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}
