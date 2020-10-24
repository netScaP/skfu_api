import * as authentication from '@feathersjs/authentication';
import errors from '@feathersjs/errors';
import moment from 'moment';

import { HookContext, Paginated } from '@feathersjs/feathers';
import { ServiceModels, ServiceTypes } from '../../declarations';
import { Sequelize } from 'sequelize';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [
      async (context: HookContext<ServiceModels['stats']>) => {
        const {
          app,
          params: { user, query },
        } = context;
        const sequelizeClient: Sequelize = app.get('sequelizeClient');
        const { models } = sequelizeClient;

        if (!user) {
          throw new errors.Forbidden();
        }

        const vacancyModel: ServiceTypes['vacancies']['Model'] = app.service('vacancies').Model;
        interface IStat {
          month: string;
          count: string;
          dataValues?: IStat;
          toJSON?: any;
        }
        const whereQuery: { [key: string]: any } = {
          createdAt: {
            $gte: moment().startOf('year').toDate(),
            $lte: moment().endOf('year').toDate(),
          },
        };
        if (query && query.companyId) {
          whereQuery.companyId = query.companyId;
        }
        let stats: IStat[] & { dataValues?: IStat[]; toJSON?: any } = await vacancyModel.findAll({
          where: whereQuery,
          attributes: [
            [Sequelize.fn('date_trunc', 'month', Sequelize.col('createdAt')), 'month'],
            [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
          ],
          group: ['month'],
        });

        if (typeof stats.toJSON === 'function') {
          stats = stats.toJSON();
        } else if (stats.dataValues) {
          stats = { ...stats.dataValues };
        }

        const vacancies: { [key: string]: string } = {};
        for (let i = 1; i < 13; i++) {
          vacancies[i] = '0';
        }

        // @ts-ignore
        context.result = {};

        context.result!.vacancies = stats.reduce(
          (vacancies: ServiceModels['stats']['vacancies'], stat) => {
            const values = stat.dataValues ? { ...stat.dataValues } : { ...stat };
            const month: string = moment(values.month).format('M');
            vacancies[month] = values.count;

            return vacancies;
          },
          vacancies
        );

        context.result!.universityCounts = (<Paginated<any>>(
          await app.service('universities').find({})
        )).total;
        context.result!.vacanciesCounts = (<Paginated<any>>await app.service('vacancies').find({
          query: {
            status: 'available',
          },
        })).total;
        context.result!.studentsCounts = (<Paginated<any>>(
          await app.service('students').find({})
        )).total;

        return context;
      },
    ],
  },

  after: {
    all: [],
    find: [],
  },

  error: {
    all: [],
    find: [],
  },
};

function toFixed(string: string): string {
  return Number.parseFloat(string).toFixed(2);
}
