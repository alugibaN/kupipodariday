import { IsEmpty, IsUrl, Length } from 'class-validator';
import { Offers } from 'src/components/offers/entities/offer.entitie';
import { Users } from 'src/components/users/entities/users.entitie';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wishes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 200)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0,
  })
  raised: number;

  @ManyToOne(() => Users, (user) => user.wishes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  owner: Users;

  @Column()
  @Length(1, 1024)
  description: string;

  @OneToMany(() => Offers, (offers) => offers.item, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  offers: Offers[];

  @Column({
    default: 0,
  })
  copied: number;

  @IsEmpty()
  @CreateDateColumn()
  createdAt: Date;

  @IsEmpty()
  @UpdateDateColumn()
  updatedAt: Date;
}
