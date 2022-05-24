import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { PrismaClient, User } from '@prisma/client';
import { isEmpty } from '@utils/util';
import { hash } from 'bcrypt';

class UserService {
  users = new PrismaClient().user;

  async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.users.findMany();
    return allUser;
  }

  async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ data: { ...userData, password: hashedPassword } });
    return createUserData;
  }

  async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await hash(userData.password, 10);
    const updateUserData = await this.users.update({ where: { id: userId }, data: { ...userData, password: hashedPassword } });
    return updateUserData;
  }

  async deleteUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    const deleteUserData = await this.users.delete({ where: { id: userId } });
    return deleteUserData;
  }
}

export default UserService;
