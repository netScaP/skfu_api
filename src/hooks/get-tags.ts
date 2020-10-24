import { Hook, HookContext, Id } from '@feathersjs/feathers';
import { ServiceModels } from '../declarations';

export default (options: { type: 'student' | 'vacancy' }): Hook => {
  return async (context: HookContext) => {
    const { app, result } = context;
    const record = result && result.dataValues ? result.dataValues : result;
    const { type } = options;

    if (!record) {
      return context;
    }

    const service = `${type}-tag`;
    const idField = `${type}Id`;

    const tagsIds = (<{ tagId: Id }[]>await app.service(service).find({
      query: {
        [idField]: record.id,
      },
      paginate: false,
    })).map(e => e.tagId);

    const tags = <ServiceModels['tags'][]>await app.service('tags').find({
      query: {
        id: { $in: tagsIds },
      },
      paginate: false,
    });

    record.tags = tags.map(e => e.name);

    return context;
  };
};
