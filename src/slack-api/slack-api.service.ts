import { Injectable } from '@nestjs/common';
import { SlackService } from 'src/slack/slack.service';

@Injectable()
export class SlackApiService {
  constructor(private slackBotService: SlackService) {}

  public sendMessageApproveQuotation(qtId: string) {
    return this.slackBotService.appSlack.client.chat.postMessage({
      channel: process.env.QT_CHANEL_ID,
      text: `ใบเสนอราคาเลขที่ ${qtId}`,
      attachments: [
        {
          color: '#F2C94C',
          blocks: [
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: 'ใบเสนอราคาเลขที่ ${qtId}',
              },
            },
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: '${contact.restaurant_name}',
                emoji: true,
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
          ],
        },
      ],
    });
  }
}
