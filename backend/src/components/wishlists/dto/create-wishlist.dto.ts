import { IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateWishlistDto {
  @Length(1, 250)
  name: string;

  @IsUrl()
  image: string;

  description: string;

  @IsNotEmpty()
  itemsId: number[];
}
