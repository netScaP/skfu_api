// Initializes the `company-city` service on path `/company-city`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { CompanyCity } from './company-city.class';
import createModel from '../../models/company-city.model';
import hooks from './company-city.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'company-city': CompanyCity & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/company-city', new CompanyCity(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('company-city');

  service.hooks(hooks);
}
