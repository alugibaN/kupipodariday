import { IsEmpty } from 'class-validator';
import { Users } from 'src/components/users/entities/users.entitie';
import { Wishes } from 'src/components/wishes/entities/wish.entitie';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Offers {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.offers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: Users;

  @ManyToOne(() => Wishes, (wish) => wish.offers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  item: Wishes;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  amount: number;

  @Column({
    default: false,
  })
  hidden: boolean;

  @IsEmpty()
  @CreateDateColumn()
  createdAt: Date;

  @IsEmpty()
  @UpdateDateColumn()
  updatedAt: Date;
}
