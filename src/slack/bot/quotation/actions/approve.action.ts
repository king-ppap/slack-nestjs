import { Injectable, Logger } from '@nestjs/common';
import {
  AllMiddlewareArgs,
  BlockAction,
  GenericMessageEvent,
  SlackActionMiddlewareArgs,
} from '@slack/bolt';
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
    respond,
  }: SlackActionMiddlewareArgs<BlockAction> & AllMiddlewareArgs) {
    const message = <GenericMessageEvent>body.message;
    this.logger.debug(JSON.stringify(message.attachments[0], null, '  '));

    // TODO qt number
    const qtId = new Date().toISOString();

    const data = new BotHelper().dataToContextMrkdwn({
      ts: message.ts,
      qt: qtId,
    });

    this.logger.debug(data);

    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        callback_id: 'qt-approve-confirm',
        title: {
          type: 'plain_text',
          text: 'Approve',
          emoji: true,
        },
        submit: {
          type: 'plain_text',
          text: 'Confirm',
          emoji: true,
        },
        close: {
          type: 'plain_text',
          text: 'Cancel',
          emoji: true,
        },
        blocks: [
          {
            type: 'divider',
          },
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: `ใบเสนอราคาเลขที่ ${qtId}`,
              emoji: true,
            },
          },
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: `ต้องการยอมรับหรือไม่`,
              emoji: true,
            },
          },
          {
            type: 'divider',
          },
          ...data,
        ],
      },
    });
    this.logger.debug(result);
    await ack();
  }
}
