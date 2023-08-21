import {
  Inject,
  Controller,
  Query,
  Get,
  Post,
  Body,
  App,
} from '@midwayjs/core';
import { Context, Application } from 'egg';
import { IGetUserResponse } from '../interface';
import { UserService, User } from '../service/user';
import { HttpService } from '@midwayjs/axios';
import { LoginDTO, UserDTO } from '../dto/user';
import { ValidateService } from '@midwayjs/validate';
import { CaptchaService } from '@midwayjs/captcha';

@Controller('/api')
export class APIController {
  @App()
  app: Application;

  @Inject()
  ctx: Context;

  @Inject()
  HttpService: HttpService;

  @Inject()
  userService: UserService;

  @Inject()
  User: User;

  @Inject()
  validateService: ValidateService;

  @Inject()
  captchaService: CaptchaService;

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

  @Post('/register')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async register(@Body() user): Promise<{}> {
    console.log('user111', user);
    const result = this.validateService.validate(LoginDTO, user);
    console.log('result', result);
    const data = await this.User.register(result?.value);
    return data;
  }

  @Post('/login')
  async login(@Body() loginData): Promise<object> {
    const result = this.validateService.validate(LoginDTO, loginData);
    const data = await this.User.login(result?.value);
    console.log('data', data);
    if (data?.id) {
      const token = await this.User.getToken(data);
      return {
        token,
      };
    }
    return data;
  }
}
