import { Injectable, Logger } from '@nestjs/common';
import BotHelper from 'src/slack/bot/utils/bot.helper';
import { SlackService } from 'src/slack/slack.service';
import { SendMessageQuotationDto } from './dto/quotation.dto';
import { DateTime } from 'luxon';

@Injectable()
export class SlackApiService {
  private logger = new Logger(SlackApiService.name);
  constructor(private slackBotService: SlackService) {}

  public sendMessageApproveQuotation(qtData: SendMessageQuotationDto) {
    this.logger.debug(qtData);
    return this.slackBotService.appSlack.client.chat.postMessage({
      channel: process.env.QT_CHANEL_ID,
      text: `*<https://int.fs-sandbox.com/qtdoc/${
        qtData.qt_id
      }|ใบเสนอราคาเลขที่ ${qtData.qt_number}> ${DateTime.fromISO(
        qtData.create_dt,
      ).toFormat('dd LLLL yyyy TT')}*`,
      attachments: [
        {
          color: '#F2C94C',
          blocks: [
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: `ใบเสนอราคาเลขที่ ${qtData.qt_number}`,
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
              type: 'actions',
              elements: [
                {
                  type: 'button',
                  style: 'primary',
                  text: {
                    type: 'plain_text',
                    text: 'Approve',
                    emoji: true,
                  },
                  value: 'idOfQt',
                  action_id: 'qt-approve',
                },
                {
                  type: 'button',
                  style: 'danger',
                  text: {
                    type: 'plain_text',
                    text: 'Deny',
                    emoji: true,
                  },
                  value: 'idOfQt',
                  action_id: 'qt-deny',
                },
              ],
            },
            ...new BotHelper().dataToContextMrkdwn(qtData),
          ],
        },
      ],
    });
  }
}
