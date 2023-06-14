import { App, Configuration, ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as egg from '@midwayjs/web';
import * as axios from '@midwayjs/axios';
import * as validate from '@midwayjs/validate';
import { ValidateErrorFilter } from './filter/validate.filter';
import * as jwt from '@midwayjs/jwt';
import { JwtMiddleware } from './middleware/jwt.middleware';

@Configuration({
  imports: [egg, axios, validate, jwt],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {
    this.app.useFilter([ValidateErrorFilter]);
    this.app.useMiddleware(JwtMiddleware);
  }
}
