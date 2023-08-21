import { App, Controller, Get, Inject } from '@midwayjs/core';
import { Application } from '@midwayjs/web';
import { prisma } from '../prisma';
import { Context } from 'egg';

@Controller('/api')
export class User {
  @App()
  App: Application;

  @Inject()
  ctx: Context;

  @Get('/get_users')
  async getUserList() {
    const res = await prisma.user.findMany();
    console.log('res', res);
    // this.ctx.header['cache-control'] = 'max-age=60';
    this.ctx.set('cache-control', 'max-age=60,public');
    this.ctx.set('last-modified', '2024-01-01');
    this.ctx.set('etag', '1234567');
    this.ctx.set('Access-Control-Allow-Origin', '*');
    this.ctx.set('Content-Type', 'text/html; charset=utf-8');
    return `
    <html>
      <head>
        <title>My HTML Page</title>
      </head>
      <body>
        <h1>Hello, world!</h1>
        <p>This is a simple HTML page.</p>
      </body>
    </html>
  `;
    // return res;
  }
}
