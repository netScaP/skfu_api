// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const specializations = sequelizeClient.define(
    'specializations',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['main', 'sub']],
        },
        allowNull: false,
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
  (specializations as any).associate = (models: any): void => {
    (specializations as any).hasMany(models.specializations, {
      foreignKey: { name: 'specializationId', allowNull: true },
      as: 'subSpecializations',
    });
  };

  return specializations;
}
