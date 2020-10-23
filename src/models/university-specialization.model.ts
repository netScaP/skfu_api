// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const universitySpecialization = sequelizeClient.define(
    'university_specialization',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      universityId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'universities',
          key: 'id',
        },
      },
      specializationId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'specializations',
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
  (universitySpecialization as any).associate = (models: any): void => {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return universitySpecialization;
}
