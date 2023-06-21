import { App, Controller, Get } from '@midwayjs/core';
import { Application } from '@midwayjs/web';

@Controller('/api')
export class User {
  @App()
  App: Application;

  @Get('/get_users')
  async getUserList() {
    const res = await this.App.prisma.user.findMany();
    console.log('res', res);
    return res;
  }
}
