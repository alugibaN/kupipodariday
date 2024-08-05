import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OffersService } from './offers.service';
import { JwtGuard } from '../auth/guard/auth.guard';
import { CreateOfferDto } from './dto/create-offer.dto';
import { AuthUser } from '../auth/decoratiors/user.decorator';
import { Users } from '../users/entities/users.entitie';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  createOffers(@AuthUser() user: Users, @Body() dto: CreateOfferDto) {
    return this.offersService.create(user, dto);
  }
  @Get()
  findAllOffers() {
    return this.offersService.findAll();
  }
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.offersService.findOneById(id);
  }
}
