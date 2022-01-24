import { Module } from '@nestjs/common';
import { SlackModule } from './slack/slack.module';

import { ConfigModule } from '@nestjs/config';
import { SlackApiModule } from './slack-api/slack-api.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SlackModule,
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    SlackApiModule,
    AuthModule,
  ],
})
export class AppModule {}
