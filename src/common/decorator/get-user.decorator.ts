import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Auth } from 'src/auth/entity/auth.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): Auth => {
    const req = ctx.switchToHttp().getRequest();
    console.log(req);
    return req.user;
  },
);
