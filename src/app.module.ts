import { Module } from '@nestjs/common';
import { SlackController } from './slack/slack.controller';
import { SlackModule } from './slack/slack.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SlackModule,
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
  ],
  controllers: [SlackController],
})
export class AppModule {}
