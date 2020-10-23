// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const users = sequelizeClient.define(
    'users',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      role: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['student', 'company', 'university', 'admin']],
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
  (users as any).associate = function (models: any): void {
    (users as any).belongsTo(models.companies, {
      as: 'company',
      foreignKey: { name: 'companyId' },
    });
    (users as any).belongsTo(models.universities, {
      as: 'university',
      foreignKey: { name: 'universityId' },
    });

    (users as any).hasMany(models.workers, {
      foreignKey: { name: 'userId', allowNull: true },
    });
    (users as any).hasMany(models.students, {
      foreignKey: { name: 'userId', allowNull: true },
    });
  };

  return users;
}
