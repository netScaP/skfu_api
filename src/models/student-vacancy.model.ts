// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const studentVacancy = sequelizeClient.define(
    'student_vacancy',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      studentId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'students',
          key: 'id',
        },
      },
      vacancyId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'vacancies',
          key: 'id',
        },
      },

      interviewDate: {
        type: DataTypes.DATE,
      },
      interviewStatus: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['wait', 'success', 'failed']],
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
  (studentVacancy as any).associate = (models: any): void => {
    (studentVacancy as any).belongsTo(models.workers, {
      as: 'worker',
      foreignKey: { name: 'workerId' },
    });
    (studentVacancy as any).belongsTo(models.students, {
      as: 'student',
      foreignKey: { name: 'studentId', allowNull: false },
      onDelete: 'cascade',
    });
    (studentVacancy as any).belongsTo(models.vacancies, {
      as: 'vacancy',
      foreignKey: { name: 'vacancyId', allowNull: false },
      onDelete: 'cascade',
    });
  };

  return studentVacancy;
}
