/* eslint-disable prettier/prettier */
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Task } from '@/interfaces/tasks.interface';

export type TaskCreationAttributes = Optional<Task, 'id' | 'description' | 'completed' | 'folder_id'>;

export class TaskModel extends Model<Task, TaskCreationAttributes> implements Task {
  public id: number;
  public description: string;
  public completed: boolean;
  public folder_id: number;
}

export default function (sequelize: Sequelize): typeof TaskModel {
  TaskModel.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      completed: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      folder_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'tasks',
      timestamps: false,
      sequelize,
    },
  );

  return TaskModel;
}
