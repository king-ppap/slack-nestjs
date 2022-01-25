import { Injectable, Logger } from '@nestjs/common';
import {
  AllMiddlewareArgs,
  GenericMessageEvent,
  SlackViewMiddlewareArgs,
} from '@slack/bolt';
import BotHelper from '../../utils/bot.helper';
import { BotFunction, BotFunctionType } from '../../utils/bot.interface';

@Injectable()
export class DenyConfirmView implements BotFunction {
  private readonly logger = new Logger(DenyConfirmView.name);

  public readonly help = {
    id: 'qt-deny-confirm',
    type: BotFunctionType.VIEW,
    name: 'Deny quotation',
    description: 'Deny quotation',
  };

  /**
   * Deny
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
  }: SlackViewMiddlewareArgs & AllMiddlewareArgs) {
    const blocks = <Array<any>>body.view.blocks;
    this.logger.debug(blocks[blocks.length - 1]);

    const data = new BotHelper().getDataFromMessage(blocks);
    this.logger.debug(data.ts, process.env.QT_CHANEL_ID);
    try {
      const result = await client.conversations.history({
        channel: process.env.QT_CHANEL_ID,
        // TODO In a more realistic app, you may store ts data in a db
        latest: data.ts,
        inclusive: true,
        limit: 1,
      });

      const message = <GenericMessageEvent>(<unknown>result.messages[0]);
      this.logger.debug(message.text);

      await client.chat.update({
        channel: process.env.QT_CHANEL_ID,
        ts: data.ts,
        text: message.text,
        attachments: [
          {
            color: '#F56C6C',
            blocks: [
              ...message.attachments[0].blocks.slice(
                0,
                message.attachments[0].blocks.length - 3,
              ),
            ],
          },
        ],
      });
    } catch (error) {
      this.logger.error(error);
    }

    await ack();
  }
}
