// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportError from '../../../app/middleware/error';
import ExportJwt from '../../../app/middleware/jwt';

declare module 'egg' {
  interface IMiddleware {
    error: typeof ExportError;
    jwt: typeof ExportJwt;
  }
}
