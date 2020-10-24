import { Hook, HookContext } from '@feathersjs/feathers';

export default (options: { role: 'student' | 'worker' | 'university' | 'company' }): Hook => {
  return async (context: HookContext) => {
    const { app, result, data } = context;
    const { role } = options;
    const record = result && result.dataValues ? result.dataValues : result;

    if (!record || !data || !data.user) {
      return context;
    }

    const userData = {
      ...data.user,
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
