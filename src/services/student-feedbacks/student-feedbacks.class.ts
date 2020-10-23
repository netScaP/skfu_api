import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import { Id } from '@feathersjs/feathers';

export interface Data {
  id: Id;
  studentId: Id;
  vacancyId: Id;
  workerId?: Id;
  type: 'interviewer' | 'vacancy';
  description: string;
  title: string;
  assessment: number;
  createdAt: Date;
  updatedAt: Date;
}

declare module '../../declarations' {
  interface ServiceModels {
    'student-feedbacks': Data;
  }
}

export class StudentFeedbacks extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}
