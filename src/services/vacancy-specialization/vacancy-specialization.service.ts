// Initializes the `vacancy-specialization` service on path `/vacancy-specialization`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { VacancySpecialization } from './vacancy-specialization.class';
import createModel from '../../models/vacancy-specialization.model';
import hooks from './vacancy-specialization.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'vacancy-specialization': VacancySpecialization & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/vacancy-specialization', new VacancySpecialization(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('vacancy-specialization');

  service.hooks(hooks);
}
