import { JwtService } from '@midwayjs/jwt';

export const getToken = async (data, secret, options) => {
  return await JwtService.sign(data, secret, options);
};
