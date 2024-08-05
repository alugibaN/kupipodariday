import { Users } from 'src/components/users/entities/users.entitie';
import { Wishes } from 'src/components/wishes/entities/wish.entitie';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

@EventSubscriber()
export class WishSubscriber implements EntitySubscriberInterface<Wishes> {
  /**
   * Указывает, что этот subscriber слушает события для сущности Wish.
   */
  listenTo() {
    return Wishes;
  }

  /**
   * Вызывается перед вставкой сущности Wish.
   */
  async beforeInsert(event: InsertEvent<Wishes>) {
    const wish = event.entity;
    if (wish.owner) {
      const userRepository = event.manager.getRepository(Users);
      const user = await userRepository.findOne({
        where: { id: wish.owner.id },
        relations: ['wishes'],
      });
      if (user) {
        user.wishes.push(wish);
        await userRepository.save(user);
      }
    }
  }
}
