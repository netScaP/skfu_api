// Initializes the `specializations` service on path `/specializations`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Specializations } from './specializations.class';
import createModel from '../../models/specializations.model';
import hooks from './specializations.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'specializations': Specializations & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/specializations', new Specializations(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('specializations');

  service.hooks(hooks);
}
