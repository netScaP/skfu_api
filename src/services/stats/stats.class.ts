import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../declarations';

interface Data {
  vacancies: { [key: string]: string };
  universityCounts: number;
  vacanciesCounts: number;
  studentsCounts: number;
}

interface ServiceOptions {}

declare module '../../declarations' {
  interface ServiceModels {
    stats: Data;
  }
}

export class Stats implements Partial<ServiceMethods<Data>> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params?: Params): Promise<Data[] | Paginated<Data>> {
    return [];
  }
}
