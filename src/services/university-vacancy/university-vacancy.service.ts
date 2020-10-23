// Initializes the `university-vacancy` service on path `/university-vacancy`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { UniversityVacancy } from './university-vacancy.class';
import createModel from '../../models/university-vacancy.model';
import hooks from './university-vacancy.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'university-vacancy': UniversityVacancy & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/university-vacancy', new UniversityVacancy(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('university-vacancy');

  service.hooks(hooks);
}
