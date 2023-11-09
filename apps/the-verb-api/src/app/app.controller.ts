import { Controller, Get, HttpStatus, Res } from '@nestjs/common';

import { Cron, CronExpression } from '@nestjs/schedule';
import { AppService } from './app.service';
import { FastifyReply } from 'fastify';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async changeWordDay(): Promise<void> {
    try {
      await this.appService.changeWordDay();
    } catch (error) {
      console.log(error);
    }
  }

  @Get('update-word')
  async updateWord(@Res() res:FastifyReply) {
    try {
      await this.changeWordDay();
      res.status(200).send(true);
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(false);
    }
  }

  @Get('word')
  async getQuoteOfTheDay(@Res() res:FastifyReply) {
    try {
      const word = await this.appService.getWordOfTheDay();
      word.solution = Buffer.from(word.solution).toString('base64');
      res.status(200).send(word)
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(false);
    }
  }
}
