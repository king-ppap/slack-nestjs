import { Injectable } from '@nestjs/common';
import { AllMiddlewareArgs, SlackActionMiddlewareArgs } from '@slack/bolt';
import { BotFunction, BotFunctionType } from '../../bot/utils/bot.interface';

@Injectable()
export class ApproveAction implements BotFunction {
  public readonly help = {
    id: 'QTapprove',
    type: BotFunctionType.ACTION,
    name: 'Approve quotation',
    description: 'Approve quotation',
  };

  public async handler(e: SlackActionMiddlewareArgs & AllMiddlewareArgs) {
    const { action, ack, respond } = e;
    await respond(JSON.stringify(action, null, '\t'));
    await ack();
  }
}
