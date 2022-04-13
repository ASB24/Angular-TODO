/* eslint-disable prettier/prettier */
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Folder } from '@/interfaces/tasks.interface';

export type FolderCreationAttributes = Optional<Folder, 'id' | 'name' | 'user_id'>;

export class FolderModel extends Model<Folder, FolderCreationAttributes> implements Folder {
  public id: number;
  public name: string;
  public user_id: string;
}

export default function (sequelize: Sequelize): typeof FolderModel {
  FolderModel.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      user_id: {
        allowNull: false,
        type: DataTypes.STRING(20),
      }
    },
    {
      tableName: 'folders',
      timestamps: false,
      sequelize,
    },
  );

  return FolderModel;
}
