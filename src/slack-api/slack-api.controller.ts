import {
  Controller,
  Post,
  Version,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendMessageQuotationDto } from './dto/quotation.dto';
import { SlackApiService } from './slack-api.service';

@Controller('slack-api')
@ApiTags('Slack Bot')
export class SlackApiController {
  constructor(private slackApiService: SlackApiService) {}

  @Post('approve')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  async sendMessageApproveQuotation(
    @Body() quotation: SendMessageQuotationDto,
  ) {
    await this.slackApiService.sendMessageApproveQuotation(quotation);
  }
}
