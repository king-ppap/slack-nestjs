import { Controller, Post, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SlackApiService } from './slack-api.service';

@Controller('slack-api')
export class SlackApiController {
  constructor(private slackApiService: SlackApiService) {}

  @Post('approve')
  @Version('1')
  @ApiTags('Bot')
  sendMessageApproveQuotation() {
    this.slackApiService.sendMessageApproveQuotation();
    return 'asdfasdasdf';
  }
}
