import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offers } from './entities/offer.entitie';
import { Repository } from 'typeorm';
import { Wishes } from '../wishes/entities/wish.entitie';
import { Users } from '../users/entities/users.entitie';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offers)
    private offersRepository: Repository<Offers>,
    @InjectRepository(Wishes)
    private wishesRepository: Repository<Wishes>,
  ) {}

  async create(user: Users, dto: CreateOfferDto) {
    const { itemId, ...newDto } = dto;
    const wish = await this.wishesRepository.findOne({
      where: { id: dto.itemId },
    });
    if (!wish) throw new NotFoundException('Wish not found');
    const newOfer = {
      ...newDto,
      user: user,
      item: wish,
    };
    if (dto.amount + wish.raised > wish.price) {
      throw new BadRequestException('Не допустимая сумма. Превышен лимит');
    }
    await this.wishesRepository.update(wish.id, {
      raised: +dto.amount + +wish.raised,
    });
    return await this.offersRepository.save(newOfer);
  }

  async findAll(): Promise<Offers[]> {
    return await this.offersRepository.find();
  }

  async findOneById(id: number) {
    const offer = await this.offersRepository.findOne({
      where: { id: id },
      select: ['user', 'item'],
      relations: ['user', 'item'],
    });
    if (!offer) throw new NotFoundException('Offer not found');
    return offer;
  }
}
