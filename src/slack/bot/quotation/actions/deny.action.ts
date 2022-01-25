import { Injectable, Logger } from '@nestjs/common';
import {
  AllMiddlewareArgs,
  BlockAction,
  GenericMessageEvent,
  SlackActionMiddlewareArgs,
} from '@slack/bolt';
import { DateTime } from 'luxon';
import { SendMessageQuotationViewDto } from 'src/slack-api/dto/quotation.dto';
import BotHelper from '../../utils/bot.helper';
import { BotFunction, BotFunctionType } from '../../utils/bot.interface';

@Injectable()
export class DenyAction implements BotFunction {
  private readonly logger = new Logger(DenyAction.name);

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

      const botHelper = new BotHelper();
      const qtData = <SendMessageQuotationViewDto>(
        botHelper.getDataFromMessage(message.attachments[0].blocks)
      );
      this.logger.debug(qtData);

      const attachData = botHelper.dataToContextMrkdwn({
        ts: message.ts,
        qt_id: qtData.qt_id,
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
                text: `ปฏิเสธ ใบเสนอราคาเลขที่ ${qtData.qt_number}`,
              },
            },
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: `${qtData.contact.restaurant_name}`,
                emoji: true,
              },
            },
            {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: `ชื่อ: \`${qtData.contact.name}\``,
                },
                {
                  type: 'mrkdwn',
                  text: `บริษัท: \`${qtData.contact.company}\``,
                },
                {
                  type: 'mrkdwn',
                  text: `เบอร์: \`${qtData.contact.phone}\``,
                },
                {
                  type: 'mrkdwn',
                  text: `อีเมล: \`${qtData.contact.email}\``,
                },
              ],
            },
            {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: `ยอดชำระ: \`${qtData.price}\``,
                },
                {
                  type: 'mrkdwn',
                  text: `เครดิต (วัน): \`${qtData.credit}\``,
                },
                {
                  type: 'mrkdwn',
                  text: `วันที่ชำระ: \`${DateTime.fromISO(
                    qtData.credit_due_date,
                  ).toFormat('dd LLLL yyyy TT')}\``,
                },
                {
                  type: 'mrkdwn',
                  text: `Sale: \`${qtData.sale}\``,
                },
              ],
            },
            {
              type: 'divider',
            },
            {
              type: 'input',
              element: {
                type: 'plain_text_input',
                multiline: true,
                action_id: 'plain_text_input-action',
              },
              label: {
                type: 'plain_text',
                text: 'เนื่องจาก',
                emoji: true,
              },
            },
            ...attachData,
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
