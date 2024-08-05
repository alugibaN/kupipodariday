import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishes } from './entities/wish.entitie';
import { Users } from '../users/entities/users.entitie';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wishes)
    private wishesRepository: Repository<Wishes>,
  ) {}

  async create(user: Users, createWishDto: CreateWishDto) {
    const wish = {
      ...createWishDto,
      owner: user,
    };
    return await this.wishesRepository.save(wish);
  }

  async findLastpost() {
    const wishes = await this.wishesRepository.find({
      take: 40,
      order: {
        createdAt: 'DESC',
      },
      select: { offers: false },
    });
    return wishes;
  }

  async findTopPost() {
    const wishes = await this.wishesRepository.find({
      take: 10,
      order: {
        copied: 'DESC',
      },
      select: { offers: false },
    });
    return wishes;
  }
  async findById(id: number) {
    const wish = await this.wishesRepository.findOne({
      where: { id: id },
    });
    return wish;
  }
  async updateWishesById(user: Users, id: number, dto: UpdateWishDto) {
    const wish = await this.wishesRepository.findOne({
      where: { id: id },
      relations: ['owner'],
    });
    if (user.id !== wish.owner.id)
      throw new UnauthorizedException(
        'У пользователя нет прав на совершения этого действия ',
      );
    Object.assign(wish, dto);
    return await this.wishesRepository.save(wish);
  }

  async removeWishById(user, id: number) {
    const wish = await this.wishesRepository.findOne({
      where: { id: id },
      relations: ['owner'],
    });
    if (user.id !== wish.owner.id)
      throw new UnauthorizedException(
        'У пользователя нет прав на совершения этого действия ',
      );
    return await this.wishesRepository.delete(id);
  }

  async copy(user: Users, id: number, dto: UpdateWishDto) {
    const wish = await this.wishesRepository.findOne({
      where: { id: id },
    });

    if (!wish) throw new NotFoundException('Wish not found');

    const newWish = this.wishesRepository.create({
      ...wish,
      ...dto,
      id: undefined,
      owner: user,
    });
    await this.wishesRepository.update(id, { copied: wish.copied + 1 });

    return await this.wishesRepository.save(newWish);
  }
}
