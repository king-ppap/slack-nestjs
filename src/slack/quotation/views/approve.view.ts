import { Injectable, Logger } from '@nestjs/common';
import {
  AllMiddlewareArgs,
  BlockAction,
  GenericMessageEvent,
  SlackActionMiddlewareArgs,
  SlackViewMiddlewareArgs,
} from '@slack/bolt';
import { BotFunction, BotFunctionType } from '../../bot/utils/bot.interface';

@Injectable()
export class ApproveConfirmView implements BotFunction {
  private readonly logger = new Logger(ApproveConfirmView.name);

  public readonly help = {
    id: 'qt-approve-confirm',
    type: BotFunctionType.VIEW,
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
  }: SlackViewMiddlewareArgs & AllMiddlewareArgs) {
    // const message = <GenericMessageEvent>body.message;
    this.logger.debug(body.view.title);


    // await client.chat.update({
    //   channel: process.env.
    //   attachments: [
    //     {
    //       color: '#67C23A',
    //       blocks: [
    //         ...message.attachments[0].blocks.slice(0, 3),
    //         ...message.attachments[0].blocks.slice(4),
    //       ],
    //     },
    //   ],
    // });

    await ack();
  }
}
