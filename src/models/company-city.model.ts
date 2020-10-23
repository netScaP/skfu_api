// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const companyCity = sequelizeClient.define(
    'company_city',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      companyId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'companies',
          key: 'id',
        },
      },
      cityId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'cities',
          key: 'id',
        },
      },
    },
    {
      hooks: {
        beforeCount(options: any): HookReturn {
          options.raw = true;
        },
      },
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (companyCity as any).associate = (models: any): void => {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return companyCity;
}
