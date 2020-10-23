// Initializes the `student-vacancy` service on path `/student-vacancy`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { StudentVacancy } from './student-vacancy.class';
import createModel from '../../models/student-vacancy.model';
import hooks from './student-vacancy.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'student-vacancy': StudentVacancy & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/student-vacancy', new StudentVacancy(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('student-vacancy');

  service.hooks(hooks);
}
