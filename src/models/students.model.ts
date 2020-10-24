// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const students = sequelizeClient.define(
    'students',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.DATEONLY,
      },
      education: {
        type: DataTypes.TEXT,
      },
      job: {
        type: DataTypes.TEXT,
      },
      additionalSkills: {
        type: DataTypes.TEXT,
      },
      personalQualities: {
        type: DataTypes.TEXT,
      },
      achievements: {
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
  (students as any).associate = (models: any): void => {
    (students as any).belongsTo(models.cities, {
      as: 'city',
      foreignKey: { name: 'cityId' },
    });
    (students as any).belongsToMany(models.universities, {
      as: 'universities',
      through: models.student_university,
      foreignKey: { name: 'studentId', allowNull: false },
      onDelete: 'CASCADE',
    });
    (students as any).belongsToMany(models.specializations, {
      as: 'specializations',
      through: models.student_specialization,
      foreignKey: { name: 'studentId', allowNull: false },
      onDelete: 'CASCADE',
    });
  };

  return students;
}
