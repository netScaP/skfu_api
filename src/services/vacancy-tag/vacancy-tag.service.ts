// Initializes the `vacancy-tag` service on path `/vacancy-tag`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { VacancyTag } from './vacancy-tag.class';
import createModel from '../../models/vacancy-tag.model';
import hooks from './vacancy-tag.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'vacancy-tag': VacancyTag & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/vacancy-tag', new VacancyTag(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('vacancy-tag');

  service.hooks(hooks);
}
