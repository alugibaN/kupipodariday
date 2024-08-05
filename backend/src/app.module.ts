import { Module } from '@nestjs/common';
import { UsersModule } from './components/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishesModule } from './components/wishes/wishes.module';
import { WishlistsModule } from './components/wishlists/wishlists.module';
import { OffersModule } from './components/offers/offers.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './utils/config/configuration';
import { DatabaseConfigFactory } from './utils/config/database-config,factory';
import { AuthModule } from './components/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigFactory,
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
    AuthModule,
  ],
})
export class AppModule {}
