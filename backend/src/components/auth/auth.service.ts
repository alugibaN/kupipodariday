import { Body, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/components/users/users.service';
import { verifyHash } from 'src/utils/hash/hash';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  auth(@Body() user: any) {
    const { username, id } = user;
    const secret = this.configService.get<string>('jwt.secret');
    const expiresIn = this.configService.get<string>('jwt.expiresIn');
    return {
      access_token: this.jwtService.sign(
        { username, sub: id },
        {
          secret: secret,
          expiresIn: expiresIn,
        },
      ),
    };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findMany(username, true);
    const verifyHashPassword = await verifyHash(password, user.password);

    if (user && verifyHashPassword) {
      return user;
    }
    return null;
  }
}
