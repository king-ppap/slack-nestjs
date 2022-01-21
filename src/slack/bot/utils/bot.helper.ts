import { App } from '@slack/bolt';
import { Logger } from '@nestjs/common';
import { BotFunction, BotFunctionType } from './bot.interface';

export default class BotHelper {
  public static async read(
    logger: Logger,
    app: App,
    modules: Array<BotFunction>,
  ) {
    try {
      await new Promise<void>((resolve, rejects) =>
        modules.forEach(async (value, index, array) => {
          logger.debug(
            `Reading Slack Bot Function '${value.help.type}': ${value.help.id}`,
          );
          if (value.help.type === 'view') {
            app.view(value.help.id, value.handler.bind(value));
          } else if (value.help.type === 'event') {
            app.event(value.help.id, value.handler.bind(value));
          } else if (value.help.type === 'action') {
            app.action(value.help.id, value.handler.bind(value));
          } else if (value.help.type === 'options') {
            app.options(value.help.id, value.handler.bind(value));
          } else if (value.help.type === 'shortcut') {
            app.shortcut(value.help.id, value.handler.bind(value));
          }
          if (index === array.length - 1) resolve();
        }),
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public dataToContextMrkdwn(data: any): Array<any> {
    return [
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: Buffer.from(JSON.stringify(data)).toString('base64'),
          },
        ],
      },
    ];
  }

  public getDataFromMessage(blocks: Array<any>): any {
    return JSON.parse(
      Buffer.from(
        blocks[blocks.length - 1].elements[0].text,
        'base64',
      ).toString(),
    );
  }
}
