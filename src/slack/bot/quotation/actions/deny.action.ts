import { Injectable } from '@nestjs/common';
import {
  AllMiddlewareArgs,
  BlockAction,
  GenericMessageEvent,
  SlackActionMiddlewareArgs,
} from '@slack/bolt';
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
      const qtId = new Date().toISOString();

      // Call views.open with the built-in client
      const result = await client.views.open({
        trigger_id: body.trigger_id,
        // View payload
        view: {
          type: 'modal',
          // View identifier
          callback_id: 'qt-deny-confirm',
          title: {
            type: 'plain_text',
            text: 'Deny',
          },
          submit: {
            type: 'plain_text',
            text: 'Submit',
          },
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: 'Welcome to a modal with _blocks_',
              },
              accessory: {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Click me!',
                },
                action_id: 'button_abc',
              },
            },
            {
              type: 'input',
              block_id: 'input_c',
              label: {
                type: 'plain_text',
                text: 'What are your hopes and dreams?',
              },
              element: {
                type: 'plain_text_input',
                action_id: 'dreamy_input',
                multiline: true,
              },
            },
            {
              type: 'section',
              text: {
                type: 'plain_text',
                text: message.ts,
                emoji: true,
              },
            },
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
