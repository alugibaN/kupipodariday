import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;
  about: string;
  avatar: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
