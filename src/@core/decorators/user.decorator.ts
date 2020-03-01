import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => data ? ctx.req.user[data] : ctx.req.user,
);