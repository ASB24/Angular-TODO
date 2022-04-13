/* eslint-disable prettier/prettier */
import { hash } from 'bcrypt';
import DB from '@databases';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';

class UserService {
  public users = DB.Users;

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'Number not provided');

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, 'User not found');

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "User data provided incorrectly");

    const findUser: User = await this.users.findOne({ where: { id: userData.id } });
    if (findUser) throw new HttpException(409, `The user ${userData.id} already exists`);

    const hashedPassword = await hash(userData.pass, 10);
    const createUserData: User = await this.users.create({ ...userData, pass: hashedPassword });
    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "User data provided incorrectly");

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User does not exist");

    const hashedPassword = await hash(userData.pass, 10);
    await this.users.update({ ...userData, pass: hashedPassword }, { where: { id: userId } });

    const updateUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User does not exist");

    return updateUser;
  }

  public async deleteUser(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "User data provided incorrectly");

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User does not exist");

    await this.users.destroy({ where: { id: userId } });

    return findUser;
  }
}

export default UserService;
