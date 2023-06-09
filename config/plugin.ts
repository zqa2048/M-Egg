import { EggPlugin } from "egg";

const plugin: EggPlugin = {
  static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  cors: {
    enable: true,
    package: "egg-cors",
  },
  routerPlus: {
    enable: true,
    package: "egg-router-plus",
  },
  redis: {
    enable: true,
    package: "egg-redis",
  },
};

if (process.env.FILE_UPLOAD_TYPE === "oss") {
  plugin.oss = {
    enable: true,
    package: "egg-oss",
  };
}
export default plugin;
