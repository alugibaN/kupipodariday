import { Controller, Post, UseGuards, Req, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from 'src/components/auth/guard/local.guard';
import { CreateUserDto } from 'src/components/users/dto/users.dto';
import { UsersService } from '../users/users.service';
import { JwtGuard } from './guard/auth.guard';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  signin(@Req() req) {
    return this.authService.auth(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.authService.auth(user);
  }
}
