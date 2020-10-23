import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import { Id } from '@feathersjs/feathers';

export interface Data {
  id: Id;
  studentId: Id;
  companyId: Id;
  asssessment: number;
  startWork: Date;
  endWork: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

declare module '../../declarations' {
  interface ServiceModels {
    'vacancy-feedbacks': Data;
  }
}

export class VacancyFeedbacks extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}
