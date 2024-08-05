import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { AuthUser } from '../auth/decoratiors/user.decorator';
import { JwtGuard } from '../auth/guard/auth.guard';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Users } from '../users/entities/users.entitie';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Get('last')
  findLastPost() {
    return this.wishesService.findLastpost();
  }
  @Get('top')
  findTopPosts() {
    return this.wishesService.findTopPost();
  }

  @UseGuards(JwtGuard)
  @Post()
  create(@AuthUser() user, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(user, createWishDto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findWishById(@Param('id') id: number) {
    return this.wishesService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateWish(
    @AuthUser() user: Users,
    @Param('id') id: number,
    @Body() dto: UpdateWishDto,
  ) {
    return this.wishesService.updateWishesById(user, id, dto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  removeWishById(@AuthUser() user: Users, @Param('id') id: number) {
    return this.wishesService.removeWishById(user, id);
  }
  @UseGuards(JwtGuard)
  @Post(':id/copy')
  copyById(
    @AuthUser() user: Users,
    @Param('id') id: number,
    @Body() wishDto: UpdateWishDto,
  ) {
    return this.wishesService.copy(user, id, wishDto);
  }
}
