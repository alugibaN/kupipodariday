import { forwardRef, Module } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishes } from './entities/wish.entitie';
import { AuthModule } from '../auth/auth.module';
import { Offers } from '../offers/entities/offer.entitie';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishes, Offers]),
    forwardRef(() => AuthModule),
  ],
  controllers: [WishesController],
  providers: [WishesService],
})
export class WishesModule {}
