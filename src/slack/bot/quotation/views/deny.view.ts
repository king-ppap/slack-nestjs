import { Injectable, Logger } from '@nestjs/common';
import {
  AllMiddlewareArgs,
  GenericMessageEvent,
  SlackViewMiddlewareArgs,
} from '@slack/bolt';
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
    // const message = <GenericMessageEvent>body.message;
    this.logger.debug(body.view.title);
    const ts = body.view.blocks[2].text;
    this.logger.debug(ts, process.env.QT_CHANEL_ID);
    try {
      // Call the conversations.history method using the built-in WebClient
      const result = await client.conversations.history({
        channel: process.env.QT_CHANEL_ID,
        // In a more realistic app, you may store ts data in a db
        latest: ts,
        // Limit results
        inclusive: true,
        limit: 1,
      });

      // There should only be one result (stored in the zeroth index)
      const message = <GenericMessageEvent>(<unknown>result.messages[0]);
      // Print message text
      this.logger.debug(message.text);

      await client.chat.update({
        channel: process.env.QT_CHANEL_ID,
        ts: ts,
        text: message.text,
        attachments: [
          {
            color: '#F56C6C',
            blocks: [
              ...message.attachments[0].blocks.slice(
                0,
                message.attachments[0].blocks.length - 1,
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
