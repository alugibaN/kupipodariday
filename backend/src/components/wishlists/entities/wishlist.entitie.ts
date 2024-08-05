import { IsEmpty, Length } from 'class-validator';
import { Users } from 'src/components/users/entities/users.entitie';
import { Wishes } from 'src/components/wishes/entities/wish.entitie';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wishlists {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 250)
  name: string;

  @Column({
    nullable: true,
  })
  @Length(1, 1500)
  description: string;

  @Column()
  image: string;

  @ManyToMany(() => Wishes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable()
  items: Wishes[];

  @ManyToOne(() => Users, (user) => user.wishlists, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  owner: Users;

  @IsEmpty()
  @CreateDateColumn()
  createdAt: Date;

  @IsEmpty()
  @UpdateDateColumn()
  updatedAt: Date;
}
