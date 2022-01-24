import { Controller, Post, Version, Body, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuotationDto } from './dto/quotation-id.dto';
import { SlackApiService } from './slack-api.service';

@Controller('slack-api')
@ApiTags('Slack Bot')
export class SlackApiController {
  constructor(private slackApiService: SlackApiService) {}

  @Post('approve')
  @Version('1')
  @HttpCode(204)
  sendMessageApproveQuotation(@Body() quotation: QuotationDto) {
    const qtId = quotation.qt_id;
    this.slackApiService.sendMessageApproveQuotation(qtId);
  }
}
