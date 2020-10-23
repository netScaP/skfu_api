import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import { Id } from '@feathersjs/feathers';

export interface Data {
  id: Id;
  title: string;
  description: string;
  salaryFrom: number;
  salaryTo: number;
  experience: number;
  workingRate: number;
  status: 'available' | 'closed';
  companyId?: Id;
  cityId?: Id;
  createdAt: Date;
  updatedAt: Date;
}

declare module '../../declarations' {
  interface ServiceModels {
    vacancies: Data;
  }
}

export class Vacancies extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}
