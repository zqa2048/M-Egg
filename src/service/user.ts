import { Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';
import { prisma } from '../prisma';

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
  async getUser(options: IUserOptions) {
    console.log('options2222', options);
    const user: any = await prisma.user.findUnique({
      where: {
        id: +options.uid,
      },
    });
    return user;
  }
}
