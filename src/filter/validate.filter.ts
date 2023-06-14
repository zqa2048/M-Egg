import { Catch } from '@midwayjs/core';
import { MidwayValidationError } from '@midwayjs/validate';
import { Context } from 'egg';

@Catch(MidwayValidationError)
export class ValidateErrorFilter {
  async catch(error: MidwayValidationError, ctx: Context) {
    return {
      status: 422,
      message: '参数校验错误，' + error.message,
    };
  }
}
