import { forwardRef, Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offers } from './entities/offer.entitie';
import { Users } from '../users/entities/users.entitie';
import { Wishes } from '../wishes/entities/wish.entitie';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Offers, Users, Wishes]),
  ],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
