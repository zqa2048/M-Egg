import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1680492584232_2582',
    egg: {
      port: 7001,
    },
    // security: {
    //   csrf: false,
    // },
  } as MidwayConfig;
};
