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
              type: 'divider',
            },
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: `Test ${qtId}`,
                emoji: true,
              },
            },
            {
              type: 'divider',
            },
            {
              type: 'actions',
              elements: [
                {
                  type: 'button',
                  style: 'primary',
                  text: {
                    type: 'plain_text',
                    text: 'Test Approve',
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
                    text: 'Test Deny',
                    emoji: true,
                  },
                  value: 'idOfQt',
                  action_id: 'qt-deny',
                },
              ],
            },
            {
              type: 'divider',
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: 'เหตุที่ไม่ผ่าน',
              },
              accessory: {
                type: 'static_select',
                placeholder: {
                  type: 'plain_text',
                  text: 'Select an item',
                  emoji: true,
                },
                options: [
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text*',
                      emoji: true,
                    },
                    value: 'value-0',
                  },
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text*',
                      emoji: true,
                    },
                    value: 'value-1',
                  },
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text*',
                      emoji: true,
                    },
                    value: 'value-2',
                  },
                ],
                action_id: 'static_select-action',
              },
            },
            {
              type: 'divider',
            },
            {
              type: 'context',
              elements: [
                {
                  type: 'image',
                  image_url:
                    'https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg',
                  alt_text: 'cute cat',
                },
                {
                  type: 'mrkdwn',
                  text: '# Discord Bot Streaming Now\nBot for Streamer.\nWhen someone have role `streamer`, Voice channel name will change to\n```\n[On Air 🔴] - <Your voice channel name>\n```\n# TODO\n1. ✅ Use role streamer\n2. ⬜ Store data to file or database\n3. 🆗 Refactor!\n4. ⬜ Slash commands\n# Getting Started',
                },
              ],
            },
          ],
        },
      ],
    });
  }
}
