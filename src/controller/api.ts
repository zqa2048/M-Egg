import { Inject, Controller, Post, Query } from '@midwayjs/core';
import { Context } from 'egg';
import { IGetUserResponse } from '../interface';
import { UserService, User } from '../service/user';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  User: User;

  @Post('/get_user')
  async getUser(@Query('uid') uid: string): Promise<IGetUserResponse> {
    // const user = await this.userService.getUser({ uid });
    console.log('ctx>>>>>>>', this.ctx);

    let count: number = +this.ctx.cookies.get('count');
    count = count ? Number(count) : 0;
    this.ctx.cookies.set('count', ++count + '');

    const user = await this.User.getUser({ uid });
    return { success: true, message: 'OK', data: { ...user, count } };
  }
}
