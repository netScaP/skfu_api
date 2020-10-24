// Initializes the `student-tag` service on path `/student-tag`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { StudentTag } from './student-tag.class';
import createModel from '../../models/student-tag.model';
import hooks from './student-tag.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'student-tag': StudentTag & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/student-tag', new StudentTag(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('student-tag');

  service.hooks(hooks);
}
