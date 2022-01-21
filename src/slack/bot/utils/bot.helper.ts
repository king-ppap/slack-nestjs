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

  /**
   * Convert data to context markdown
   * You mush paste at the end of blocks array
   * @example
   * const data = new BotHelper().dataToContextMrkdwn({
   *  ts: message.ts,
   *  qt: qtId,
   * });
   * const result = await client.views.open({
   *    trigger_id: body.trigger_id,
   *    view: {
   *      blocks: [
   *        {
   *          type: 'divider',
   *        },
   *        ...data,
   *      ],
   *    }
   *  });
   * @param data Data you want to parse to the message.
   * @returns Array of the last content.
   */
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

  /**
   * Get data from blocks
   * @param blocks Array of the block
   * @returns Data from `dataToContextMrkdwn`
   */
  public getDataFromMessage(blocks: Array<any>): any {
    return JSON.parse(
      Buffer.from(
        blocks[blocks.length - 1].elements[0].text,
        'base64',
      ).toString(),
    );
  }
}
