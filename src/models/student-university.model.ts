// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const studentUniversity = sequelizeClient.define(
    'student_university',
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
      universityId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'universities',
          key: 'id',
        },
      },

      enterDate: {
        type: DataTypes.DATEONLY,
      },
      endDate: {
        type: DataTypes.DATEONLY,
      },
      description: {
        type: DataTypes.TEXT,
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
  (studentUniversity as any).associate = (models: any): void => {
    (studentUniversity as any).belongsTo(models.specializations, {
      as: 'specialization',
      foreignKey: { name: 'specializationId', allowNull: false },
    });
  };

  return studentUniversity;
}
