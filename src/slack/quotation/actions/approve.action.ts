import { Injectable, Logger } from '@nestjs/common';
import {
  AllMiddlewareArgs,
  AttachmentAction,
  BasicElementAction,
  BlockAction,
  ButtonAction,
  GenericMessageEvent,
  MessageAttachment,
  SlackActionMiddlewareArgs,
} from '@slack/bolt';
import { BotFunction, BotFunctionType } from '../../bot/utils/bot.interface';

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
   * #F56C6C cancel
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
    const qtId = new Date().toISOString();
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        callback_id: 'qt-approve-confirm',
        // TODO qt number
        title: {
          type: 'plain_text',
          text: qtId,
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
              text: `ต้องการยอมรับใบเสนอราคาเลขที่ ${qtId} หรือไม่`,
              emoji: true,
            },
          },
        ],
      },
    });
    this.logger.debug(result);
    await ack();
  }
}
