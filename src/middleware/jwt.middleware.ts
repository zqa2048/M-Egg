import { Inject, Middleware, NextFunction, httpError } from '@midwayjs/core';
import { Context } from 'egg';
import { JwtService } from '@midwayjs/jwt';

const whiteList = ['/api/login', '/register'];

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  public static getName(): string {
    return 'jwt';
  }
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      console.log(ctx.path);

      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError();
      }
      const parts = ctx.get('authorization').trim().split(' ');
      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError();
      }
      const [scheme, token] = parts;
      if (/^Bearer$/i.test(scheme)) {
        try {
          const res = await this.jwtService.verify(token, {
            complete: true,
          });
          console.log('res', res);
        } catch (e) {
          const user = await this.jwtService.decode(token);
          console.log('user>>>', user);
          // const newToken = getToken(user)
          // ctx.set('authorization', newToken);
        }
      } else {
        throw new httpError.UnauthorizedError();
      }
    };
  }

  public match(ctx: Context): boolean {
    if (ctx.path === '/api/login') {
      return false;
    }
    return whiteList.includes(ctx.path);
  }
}
