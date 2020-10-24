import { Hook, HookContext } from '@feathersjs/feathers';
import { ServiceModels } from '../declarations';

export default (): Hook => {
  return async (context: HookContext) => {
    const { app, data } = context;

    if (!data || !data.tags) {
      return context;
    }

    const tags: ServiceModels['tags'][] = await Promise.all(
      data.tags.map(async (tag: string) => {
        const existTag = (<ServiceModels['tags'][]>await app.service('tags').find({
          query: {
            name: tag,
          },
          paginate: false,
        }))[0];

        if (existTag) {
          return existTag;
        }

        return await app.service('tags').create({ name: tag });
      })
    );

    data.tagsIds = tags.map(e => e.id);

    return context;
  };
};
