import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';
import { Offers } from 'src/components/offers/entities/offer.entitie';
import { Wishes } from 'src/components/wishes/entities/wish.entitie';
import { Wishlists } from 'src/components/wishlists/entities/wishlist.entitie';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    unique: true,
  })
  @Length(1, 64)
  @IsNotEmpty()
  username: string;

  @Column({
    default: 'Пока ничего не рассказал о себе',
  })
  @Length(1, 200)
  @IsOptional()
  about: string;

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  avatar: string;

  @Column({
    unique: true,
    nullable: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Exclude()
  @Column({ select: false })
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @OneToMany(() => Wishes, (wishes) => wishes.owner)
  wishes: Wishes[];

  @OneToMany(() => Offers, (offer) => offer.user)
  offers: Offers[];

  @OneToMany(() => Wishlists, (wishlist) => wishlist.owner)
  wishlists: Wishlists[];

  @IsEmpty()
  @CreateDateColumn()
  createdAt: Date;

  @IsEmpty()
  @UpdateDateColumn()
  updatedAt: Date;
}
