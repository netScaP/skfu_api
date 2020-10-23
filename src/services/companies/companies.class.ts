import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import { Id } from '@feathersjs/feathers';

export interface Data {
  id: Id;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

declare module '../../declarations' {
  interface ServiceModels {
    companies: Data;
  }
}

export class Companies extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}
