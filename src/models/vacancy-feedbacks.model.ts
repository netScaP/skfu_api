// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const vacancyFeedbacks = sequelizeClient.define(
    'vacancy_feedbacks',
    {
      text: {
        type: DataTypes.STRING,
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
  (vacancyFeedbacks as any).associate = (models: any): void => {
    (vacancyFeedbacks as any).belongsTo(models.students, {
      as: 'student',
      foreignKey: { name: 'studentId', allowNull: false },
      onDelete: 'cascade',
    });
    (vacancyFeedbacks as any).belongsTo(models.vacancies, {
      as: 'vacancy',
      foreignKey: { name: 'vacancyId', allowNull: false },
      onDelete: 'cascade',
    });
    (vacancyFeedbacks as any).belongsTo(models.workers, {
      as: 'worker',
      foreignKey: { name: 'workerId', allowNull: true },
    });
  };

  return vacancyFeedbacks;
}
