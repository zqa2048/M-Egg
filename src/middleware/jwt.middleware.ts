import { Inject, Middleware, NextFunction, httpError } from '@midwayjs/core';
import { Context } from 'egg';
import { JwtService } from '@midwayjs/jwt';
import { Utils } from '../utils/method';

const whiteList = ['/api/login', '/register'];

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  @Inject()
  utils: Utils;

  public static getName(): string {
    return 'jwt';
  }
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      console.log(ctx.headers);

      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError();
      }
      const parts = ctx.get('authorization').trim().split(' ');
      console.log('parts', parts);
      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError();
      }
      const [scheme, token] = parts;
      console.log('scheme', scheme);
      if (/^Bearer$/i.test(scheme)) {
        try {
          const res = await this.jwtService.verify(token, {
            complete: true,
          });
          console.log('res', res);
        } catch (e) {
          console.log('e', e);
          const user = await this.jwtService.decode(token);
          console.log('user>>>', user);
          const newToken = await this.utils.getToken(user);
          console.log('newToken', newToken);
          ctx.set('Authorization', newToken);
        }
      } else {
        throw new httpError.UnauthorizedError();
      }
      await next();
    };
  }

  public match(ctx: Context): boolean {
    console.log('ctx.path', ctx.path);

    return !whiteList.includes(ctx.path);
  }
}
