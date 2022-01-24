import { Module } from '@nestjs/common';
import { SlackModule } from 'src/slack/slack.module';
import { SlackApiController } from './slack-api.controller';
import { SlackApiService } from './slack-api.service';

@Module({
  imports: [SlackModule],
  controllers: [SlackApiController],
  providers: [SlackApiService],
})
export class SlackApiModule {}
