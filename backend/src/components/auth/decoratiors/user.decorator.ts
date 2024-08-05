import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from 'src/components/users/entities/users.entitie';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Users => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
