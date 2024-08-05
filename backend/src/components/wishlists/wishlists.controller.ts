import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  Param,
  Delete,
  Body,
  Post,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { JwtGuard } from '../auth/guard/auth.guard';
import { AuthUser } from '../auth/decoratiors/user.decorator';
import { Users } from '../users/entities/users.entitie';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@UseGuards(JwtGuard)
@Controller('wishlist')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  create(
    @AuthUser() user: Users,
    @Body() createWishlistDto: CreateWishlistDto,
  ) {
    return this.wishlistsService.create(user, createWishlistDto);
  }

  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishlistsService.findOne(id);
  }
  @Patch(':id')
  updateWishList(
    @Param('id') id: number,
    @Body() dto: UpdateWishlistDto,
    @AuthUser() user: Users,
  ) {
    return this.wishlistsService.update(id, dto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @AuthUser() user: Users) {
    return this.wishlistsService.remove(id, user);
  }
}
