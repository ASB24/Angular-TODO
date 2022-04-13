import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User } from '@interfaces/users.interface';

export type UserCreationAttributes = Optional<User, 'id' | 'pass'>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id: string;
  public pass: string;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING(20),
      },
      pass: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
    },
    {
      tableName: 'users',
      timestamps: false,
      sequelize,
    },
  );

  return UserModel;
}
