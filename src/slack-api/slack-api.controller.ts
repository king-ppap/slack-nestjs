import { Controller, Post, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SlackApiService } from './slack-api.service';

@Controller('slack-api')
@ApiTags('Slack Bot')
export class SlackApiController {
  constructor(private slackApiService: SlackApiService) {}

  @Post('approve')
  @Version('1')
  sendMessageApproveQuotation() {
    const qtId = new Date().toISOString();
    this.slackApiService.sendMessageApproveQuotation(qtId);
    return 'ได้';
  }
}
