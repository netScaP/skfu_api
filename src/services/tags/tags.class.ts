import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application, ServiceModels } from '../../declarations';
import { Id } from '@feathersjs/feathers';

export interface Data {
  id: Id;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  dataValues?: Data;
}

declare module '../../declarations' {
  interface ServiceModels {
    tags: Data;
  }
}

export class Tags extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}
