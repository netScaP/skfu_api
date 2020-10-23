// Initializes the `student-university` service on path `/student-university`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { StudentUniversity } from './student-university.class';
import createModel from '../../models/student-university.model';
import hooks from './student-university.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'student-university': StudentUniversity & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/student-university', new StudentUniversity(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('student-university');

  service.hooks(hooks);
}
