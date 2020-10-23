// Initializes the `vacancy-feedbacks` service on path `/vacancy-feedbacks`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { VacancyFeedbacks } from './vacancy-feedbacks.class';
import createModel from '../../models/vacancy-feedbacks.model';
import hooks from './vacancy-feedbacks.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'vacancy-feedbacks': VacancyFeedbacks & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/vacancy-feedbacks', new VacancyFeedbacks(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('vacancy-feedbacks');

  service.hooks(hooks);
}
