// Initializes the `university-specialization` service on path `/university-specialization`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { UniversitySpecialization } from './university-specialization.class';
import createModel from '../../models/university-specialization.model';
import hooks from './university-specialization.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'university-specialization': UniversitySpecialization & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/university-specialization', new UniversitySpecialization(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('university-specialization');

  service.hooks(hooks);
}
