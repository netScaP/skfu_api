// Initializes the `universities` service on path `/universities`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Universities } from './universities.class';
import createModel from '../../models/universities.model';
import hooks from './universities.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'universities': Universities & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/universities', new Universities(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('universities');

  service.hooks(hooks);
}
