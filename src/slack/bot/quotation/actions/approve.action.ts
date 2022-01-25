import { Injectable, Logger } from '@nestjs/common';
import {
  AllMiddlewareArgs,
  BlockAction,
  GenericMessageEvent,
  SlackActionMiddlewareArgs,
} from '@slack/bolt';
import { SendMessageQuotationViewDto } from 'src/slack-api/dto/quotation.dto';
import BotHelper from '../../utils/bot.helper';
import { BotFunction, BotFunctionType } from '../../utils/bot.interface';

@Injectable()
export class ApproveAction implements BotFunction {
  private readonly logger = new Logger(ApproveAction.name);

  public readonly help = {
    id: 'qt-approve',
    type: BotFunctionType.ACTION,
    name: 'Approve quotation',
    description: 'Approve quotation',
  };

  /**
   * Approve
   * Color
   * #67C23A approve
   * #F56C6C deny
   * #F2C94C waiting
   * @param param0 SlackActionMiddlewareArgs & AllMiddlewareArgs
   *
   */
  public async handler({
    ack,
    body,
    client,
  }: SlackActionMiddlewareArgs<BlockAction> & AllMiddlewareArgs) {
    const message = <GenericMessageEvent>body.message;
    this.logger.debug(JSON.stringify(message.attachments[0], null, '  '));

    const botHelper = new BotHelper();
    const data = <SendMessageQuotationViewDto>(
      botHelper.getDataFromMessage(message.attachments[0].blocks)
    );
    this.logger.debug(data);

    const attachData = botHelper.dataToContextMrkdwn({
      ts: message.ts,
      qt: data.qt_id,
    });

    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        callback_id: 'qt-approve-confirm',
        type: 'modal',
        title: {
          type: 'plain_text',
          text: 'Approve',
          emoji: true,
        },
        submit: {
          type: 'plain_text',
          text: 'Submit',
          emoji: true,
        },
        close: {
          type: 'plain_text',
          text: 'Cancel',
          emoji: true,
        },
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: 'ใบเสนอราคาเลขที่ ${qtId}',
            },
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: 'ชื่อ: `${contact.name}`',
              },
              {
                type: 'mrkdwn',
                text: 'บริษัท: `${contact.company}`',
              },
              {
                type: 'mrkdwn',
                text: 'เบอร์: `${contact.phone}`',
              },
              {
                type: 'mrkdwn',
                text: 'อีเมล: `${contact.email}`',
              },
            ],
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: 'ยอดชำระ: `${price}`',
              },
              {
                type: 'mrkdwn',
                text: 'Sale: `${sale}`',
              },
            ],
          },
          ...attachData,
        ],
      },
    });
    this.logger.debug(result);
    await ack();
  }
}
