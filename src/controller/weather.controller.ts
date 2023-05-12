import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { WeatherInfo } from '../interface';
import { WeatherService } from '../service/weather.service';

@Controller('/')
export class WeatherController {
  @Inject()
  weatherService: WeatherService;

  @Get('/weather')
  async getWeatherInfo(@Query('cityId') cityId: string): Promise<WeatherInfo> {
    console.log('cityId', cityId);
    return this.weatherService.getWeather(cityId);
  }
}
