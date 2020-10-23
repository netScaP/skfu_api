import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import { Id } from '@feathersjs/feathers';

export interface Data {
  id: Id;
  firstName: string;
  lastName: string;
  birthday: Date;
  goal?: string;
  education?: string;
  job?: string;
  additionalSkills?: string;
  personalQualities?: string;
  achievements?: string;
  userId: Id;
  cityId: Id;
  universityId: Id;
  specializationId: Id;
  createdAt: Date;
  updatedAt: Date;
}

declare module '../../declarations' {
  interface ServiceModels {
    students: Data;
  }
}

export class Students extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}
