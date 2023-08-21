import { Provide } from '@midwayjs/core';
import { prisma } from '../prisma';

@Provide()
export class LoginStatus {
  async register(data) {
    return prisma.logined.create({
      data,
    });
  }
}
