import { CaptchaService } from '@midwayjs/captcha';
import { Controller, Get, Inject, Post } from '@midwayjs/decorator';
// import { sendEmail, sendSMS } from '../utils';

@Controller('/api')
export class HomeController {
  @Inject()
  ctx;

  @Inject()
  captchaService: CaptchaService;

  // 示例：获取图像验证码
  @Get('/get-image-captcha')
  async getImageCaptcha() {
    const { id, imageBase64 } = await this.captchaService.image({
      width: 120,
      height: 40,
    });
    return {
      id, // 验证码 id
      imageBase64, // 验证码 SVG 图片的 base64 数据，可以直接放入前端的 img 标签内
    };
  }

  // 示例：获取计算表达式验证码
  @Get('/get-formula-captcha')
  async getFormulaCaptcha() {
    const { id, imageBase64 } = await this.captchaService.formula({ noise: 1 });
    return {
      id, // 验证码 id
      imageBase64, // 验证码 SVG 图片的 base64 数据，可以直接放入前端的 img 标签内
    };
  }

  // 验证验证码是否正确
  @Post('/check-captcha')
  async getCaptcha() {
    const { id, answer } = this.ctx.request.body;
    const passed: boolean = await this.captchaService.check(id, answer);
    if (passed) {
      return 'passed';
    }
    return 'error';
  }

  // 示例：短信验证码
  @Post('/sms-code')
  async sendSMSCode() {
    // 验证验证码是否正确
    // const { id, text: code } = await this.captchaService.text({ size: 4 });
    // await sendSMS(18888888888, code);
    // return { id };
  }

  // 示例：邮件验证码
  @Post('/email-code')
  async sendEmailCode() {
    // 验证验证码是否正确
    // const { id, text: code } = await this.captchaService.text({
    // type: 'number',
    // });
    // await sendEmail('admin@example.com', code);
    // return { id };
  }

  // 示例：将任意文本内容塞入验证码中
  @Get('/test-text')
  async testText() {
    // 存入内容，获取验证码id
    const id: string = await this.captchaService.set('123abc');
    // 根据验证码id，校验内容是否正确
    const passed: boolean = await this.captchaService.check(id, '123abc');
    return {
      passed: passed === true,
    };
  }
}
