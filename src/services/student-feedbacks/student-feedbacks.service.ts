// Initializes the `student-feedbacks` service on path `/student-feedbacks`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { StudentFeedbacks } from './student-feedbacks.class';
import createModel from '../../models/student-feedbacks.model';
import hooks from './student-feedbacks.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'student-feedbacks': StudentFeedbacks & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/student-feedbacks', new StudentFeedbacks(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('student-feedbacks');

  service.hooks(hooks);
}
