import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlists } from './entities/wishlist.entitie';
import { In, Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { Wishes } from '../wishes/entities/wish.entitie';
import { Users } from '../users/entities/users.entitie';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlists)
    private wishlistRepository: Repository<Wishlists>,
    @InjectRepository(Wishes)
    private wishRepository: Repository<Wishes>,
  ) {}
  async create(user: Users, dto: CreateWishlistDto) {
    const wish = await this.wishRepository.find({
      where: { id: In(dto.itemsId) },
    });

    if (wish.length === 0) throw new NotFoundException('No wish found');
    const { itemsId, ...newDto } = dto;
    const newWishlist = await this.wishlistRepository.create({
      ...newDto,
      owner: user,
      items: wish,
    });
    return await this.wishlistRepository.save(newWishlist);
  }

  async findAll() {
    return await this.wishlistRepository.find({
      relations: ['owner', 'items'],
    });
  }

  async findOne(id: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id: id },
      relations: ['items', 'owner'],
    });
    if (!wishlist) throw new NotFoundException('Wishlist not found');
    return wishlist;
  }

  async update(id: number, dto: UpdateWishlistDto, user: Users) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id: id },
      relations: ['items', 'owner'],
    });
    const { itemsId, ...newDto } = dto;

    if (!wishlist) throw new NotFoundException('Wishlist not found');
    if (user.id !== wishlist.owner.id)
      throw new UnauthorizedException(
        'У пользователя нет прав на совершения этого действия ',
      );

    if (dto.itemsId && dto.itemsId.length !== 0) {
      const wishes = await this.wishRepository.find({
        where: { id: In(dto.itemsId) },
      });
      if (wishes.length === 0) throw new NotFoundException('No wish found');

      wishlist.items = wishes;
      Object.assign(wishlist, newDto);

      return await this.wishlistRepository.save(wishlist);
    } else {
      Object.assign(wishlist, newDto);
      return await this.wishlistRepository.save(wishlist);
    }
  }

  async remove(id: number, user: Users) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id: id },
      relations: ['owner'],
    });

    if (user.id !== wishlist.owner.id)
      throw new UnauthorizedException(
        'У пользователя нет прав на совершения этого действия ',
      );
    return await this.wishlistRepository.delete(id);
  }
}
