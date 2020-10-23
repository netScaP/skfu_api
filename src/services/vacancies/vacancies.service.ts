// Initializes the `vacancies` service on path `/vacancies`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Vacancies } from './vacancies.class';
import createModel from '../../models/vacancies.model';
import hooks from './vacancies.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'vacancies': Vacancies & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/vacancies', new Vacancies(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('vacancies');

  service.hooks(hooks);
}
