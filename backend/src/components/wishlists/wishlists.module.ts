import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlists } from './entities/wishlist.entitie';
import { Wishes } from '../wishes/entities/wish.entitie';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Wishlists, Wishes])],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
