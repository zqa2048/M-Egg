import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo) => {
  return {
    jwt: {
      secret: appInfo.name + '_1680492584232_5555',
      expiresIn: '6000',
    },
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1680492584232_2582',
    egg: {
      port: 7001,
    },
    axios: {
      /*  default: {
        // 所有实例复用的配置
      },
      clients: {
        // 默认实例的配置
        default: {
          baseURL: 'https://api.example.com',
          // `headers` are custom headers to be sent
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          },
          timeout: 1000, // default is `0` (no timeout)

          // `withCredentials` indicates whether or not cross-site Access-Control requests
          // should be made using credentials
          withCredentials: false, // default
        },
      } */
    },
    // security: {
    //   csrf: false,
    // },
  } as MidwayConfig;
};
