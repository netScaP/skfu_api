// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const studentFeedbacks = sequelizeClient.define(
    'student_feedbacks',
    {
      type: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['interviewer', 'vacancy']],
        },
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      assessment: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 10,
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
  (studentFeedbacks as any).associate = (models: any): void => {
    (studentFeedbacks as any).belongsTo(models.students, {
      foreignKey: { name: 'studentId', allowNull: false },
      as: 'student',
    });
    (studentFeedbacks as any).belongsTo(models.vacancies, {
      foreignKey: { name: 'vacancyId', allowNull: false },
      as: 'vacancy',
    });
    (studentFeedbacks as any).belongsTo(models.workers, {
      foreignKey: { name: 'workerId', allowNull: false },
      as: 'worker',
    });
  };

  return studentFeedbacks;
}
