import { Hook, HookContext } from '@feathersjs/feathers';

export default (options: { role: 'student' | 'worker' | 'university' | 'company' }): Hook => {
  return async (context: HookContext) => {
    const {
      app,
      result,
      type,
      params: { $user },
      data,
    } = context;
    const { role } = options;
    const record = result && result.dataValues ? result.dataValues : result;

    if (type === 'before' && data && data.user) {
      context.params.$user = data.user;
      delete data.user;

      return context;
    }

    if (!record || $user) {
      return context;
    }

    const userData = {
      ...$user,
      role,
    };
    if (role === 'worker') {
      userData.companyId = record.companyId;
    }
    if (role === 'university') {
      userData.universityId = record.id;
    }
    if (role === 'company') {
      userData.companyId = record.id;
    }
    const user = await app.service('users').create(userData);

    return context;
  };
};
