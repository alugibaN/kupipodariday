import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersModule } from 'src/components/users/users.module';
import { AuthController } from './auth.conroller';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigFactory } from 'src/utils/config/jwt.config.factory';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtGuard } from './guard/auth.guard';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigFactory,
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, JwtGuard],
  controllers: [AuthController],
  exports: [JwtModule, JwtStrategy, JwtGuard],
})
export class AuthModule {}
