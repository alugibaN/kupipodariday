import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateWishDto {
  @IsNotEmpty()
  name: string;
  @IsUrl()
  @IsNotEmpty()
  link: string;
  @IsUrl()
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  description: string;
}
