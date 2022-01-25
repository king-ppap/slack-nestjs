import { Injectable } from '@nestjs/common';
import {
  AllMiddlewareArgs,
  BlockAction,
  GenericMessageEvent,
  SlackActionMiddlewareArgs,
} from '@slack/bolt';
import BotHelper from '../../utils/bot.helper';
import { BotFunction, BotFunctionType } from '../../utils/bot.interface';

@Injectable()
export class DenyAction implements BotFunction {
  public readonly help = {
    id: 'qt-deny',
    type: BotFunctionType.ACTION,
    name: 'Deny quotation',
    description: 'Deny quotation',
  };

  public async handler({
    ack,
    body,
    client,
  }: SlackActionMiddlewareArgs<BlockAction> & AllMiddlewareArgs) {
    try {
      const message = <GenericMessageEvent>body.message;
      const qtNumber = new Date().toISOString();

      const data = new BotHelper().dataToContextMrkdwn({
        ts: message.ts,
        qt: qtNumber,
      });

      // Call views.open with the built-in client
      const result = await client.views.open({
        trigger_id: body.trigger_id,
        // View payload
        view: {
          type: 'modal',
          callback_id: 'qt-deny-confirm',
          title: {
            type: 'plain_text',
            text: 'Deny',
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
            ...data,
          ],
        },
      });
      ack();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}
