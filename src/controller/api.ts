import { Inject, Controller, Query, Get, Post, Body } from '@midwayjs/core';
import { Context } from 'egg';
import { IGetUserResponse } from '../interface';
import { UserService, User } from '../service/user';
import { HttpService } from '@midwayjs/axios';
import { UserDTO } from '../dto/user';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  HttpService: HttpService;

  @Inject()
  userService: UserService;

  @Inject()
  User: User;

  @Get('/get_user')
  async getUser(@Query('uid') uid: string): Promise<IGetUserResponse> {
    // const user = await this.userService.getUser({ uid });
    console.log('ctx>>>>>>>', this.ctx);

    let count: number = +this.ctx.cookies.get('count');
    count = count ? Number(count) : 0;
    this.ctx.cookies.set('count', ++count + '');

    const user = await this.User.getUser({ uid });
    return { success: true, message: 'OK', data: { ...user, count } };
  }

  @Post('/user')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async createAndUpdateUser(@Body() user: UserDTO): Promise<{}> {
    console.log('user', user);
    const data = await this.User.createUser(user);
    return data;
  }
}
