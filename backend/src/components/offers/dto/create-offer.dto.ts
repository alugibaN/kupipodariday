import { UseGuards } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { JwtStrategy } from 'src/components/auth/strategy/jwt.strategy';

UseGuards(JwtStrategy);
export class CreateOfferDto {
  @IsNotEmpty()
  amount: number;
  hidden: boolean;
  @IsNotEmpty()
  itemId: number;
}
