import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Auth } from 'src/auth/entity/auth.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): Auth => {
    const req = ctx.switchToHttp().getRequest();
    // const 유저 = await this.userService.getUserByToken({accessToken: req.accessToken})
    // 유저 1명
    console.log(req);
    return req;
  },
);
