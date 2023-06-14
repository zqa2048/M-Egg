import { Inject, Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';
import { prisma } from '../prisma';
import { JwtService } from '@midwayjs/jwt';

@Provide()
export class UserService {
  async getUser(options: IUserOptions) {
    console.log('options', options);
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
}

@Provide()
export class User {
  @Inject()
  jwtService: JwtService;

  async getUser(options: IUserOptions) {
    console.log('options2222', options);
    const user: any = await prisma.user.findUnique({
      where: {
        id: options.uid,
      },
    });
    return user;
  }
  createUser(data) {
    if (data.id) {
      return prisma.user.update({
        where: {
          id: data.id,
        },
        data,
      });
    } else {
      return prisma.user.create({
        data,
      });
    }
  }
  async register(data) {
    return prisma.login.create({
      data,
    });
  }
  async login(data) {
    return prisma.login.findFirst({
      where: {
        email: data.email,
      },
    });
  }
  async getUserInfo(data) {
    if (Object.keys(data).length > 1) {
      return data;
    }
    return prisma.user.findFirst({
      where: {
        id: data.id,
      },
    });
  }
  async getToken(data, secret, options) {
    const user = await this.getUserInfo(data);
    console.log('user', JSON.stringify(user));
    const res = await this.jwtService.sign(
      { user: JSON.stringify(user) },
      secret,
      options
    );
    console.log('res', res);
    return res;
  }
}
