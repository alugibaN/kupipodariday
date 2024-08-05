import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';
import { hashValue } from 'src/utils/hash/hash';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Users } from './entities/users.entitie';
import { DatabaseError } from 'pg-protocol';

let returnArrUser = {
  id: true,
  username: true,
  email: true,
  password: false,
  about: true,
  avatar: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findOne(id: any, isCheck = false) {
    const user = await this.usersRepository.findOne({
      where: id,
      relations: { wishes: isCheck },
    });
    return user;
  }

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async create(dto: CreateUserDto) {
    const passwordHash = await hashValue(dto.password);
    const user = { ...dto, password: passwordHash };
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        // типизируем ошибку, чтобы получить её поля
        const dbError = error.driverError as DatabaseError;

        // сравниваем код ошибки
        if (dbError.code === '23505') {
          throw new ConflictException('username already exist');
        }
      }
      throw error; // пробрасываем ошибку дальше, если это не QueryFailedError
    }
  }

  async findMany(userParam: string, isPassword: boolean = false) {
    returnArrUser = isPassword
      ? { ...returnArrUser, password: true }
      : returnArrUser;
    const user = await this.usersRepository.findOne({
      where: [{ username: userParam }, { email: userParam }],
      select: returnArrUser,
      relations: ['wishes'],
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async updateProfile(user: Users, dto: UpdateUserDto) {
    const { password } = dto;

    if (password) {
      const hashedPassword = await hashValue(password);
      dto = { ...dto, password: hashedPassword };
    }

    try {
      await this.usersRepository.update(user.id, dto);
      return await this.usersRepository.findOne({
        where: { id: user.id },
        select: ['id', 'username', 'email', 'password', 'about'],
      });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        // типизируем ошибку, чтобы получить её поля
        const dbError = error.driverError as DatabaseError;

        // сравниваем код ошибки
        if (dbError.code === '23505') {
          throw new ConflictException('username already exist');
        }
      }
      throw error; // пробрасываем ошибку дальше, если это не QueryFailedError
    }
  }

  async findAllWishes(user: Users) {
    const wishesUser = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: ['wishes'],
    });
    return wishesUser.wishes;
  }

  async findAllUserWishes(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username: username },
      relations: ['wishes'],
    });
    return user.wishes;
  }
}
