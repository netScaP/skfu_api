// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const vacancies = sequelizeClient.define(
    'vacancies',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      salaryFrom: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
        },
        allowNull: false,
      },
      salaryTo: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
        },
        allowNull: false,
      },
      experience: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
        },
        allowNull: false,
      },
      workingRate: {
        type: DataTypes.DECIMAL(10, 2),
        validate: {
          min: 0,
        },
        defaultValue: 1,
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['available', 'closed']],
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
  (vacancies as any).associate = (models: any): void => {
    (vacancies as any).belongsTo(models.companies, {
      as: 'company',
      foreignKey: { name: 'companyId', allowNull: false },
      onDelete: 'cascade',
    });
    (vacancies as any).belongsTo(models.cities, {
      as: 'city',
      foreignKey: { name: 'cityId' },
    });

    (vacancies as any).belongsToMany(models.specializations, {
      as: 'specializations',
      through: models.vacancy_specialization,
      foreignKey: { name: 'universityId', allowNull: false },
      onDelete: 'CASCADE',
    });
  };

  return vacancies;
}
