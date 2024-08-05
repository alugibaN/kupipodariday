import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/users.entitie';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AuthUser } from '../auth/decoratiors/user.decorator';
import { JwtGuard } from '../auth/guard/auth.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('me')
  async faindUserMe(@AuthUser() user: Users): Promise<Users> {
    return await this.usersService.findOne({ id: user.id }, true);
  }
  @Patch('me')
  async changeProfile(@AuthUser() user: any, @Body() dto: UpdateUserDto) {
    return this.usersService.updateProfile(user, dto);
  }
  @Get(':username')
  async findUsername(@Param('username') username: string) {
    return await this.usersService.findMany(username);
  }
  @Post('find')
  async findUserEmail(@Body() email: { email: string }) {
    return await this.usersService.findMany(email.email);
  }
  @Get('me/wishes')
  async findUserMeWishes(@AuthUser() user: Users) {
    return await this.usersService.findAllWishes(user);
  }
  @Get(':username/wishes')
  async findUserWishes(@Param('username') username) {
    return await this.usersService.findAllUserWishes(username);
  }
}
