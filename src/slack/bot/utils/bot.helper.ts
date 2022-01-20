import { App } from '@slack/bolt';
import { Logger } from '@nestjs/common';
import * as NodeFs from 'fs/promises';
import { BotFunction, BotFunctionType } from './bot.interface';

function isBotFunction(func: any) {
  return func?.help?.type in BotFunctionType;
}

export default class BotHelper {
  public static async read(
    logger: Logger,
    app: App,
    modules: Array<BotFunction>,
  ) {
    try {
      // console.log(
      //   `⚡️ Start reading classes`,
      //   modules.map((x) => x.help.name),
      // );
      // const files = await NodeFs.readdir('./src/' + root + path);

      await new Promise<void>((resolve, rejects) =>
        modules.forEach(async (value, index, array) => {
          logger.debug(
            `Reading Slack Bot Function '${value.help.type}': ${value.help.id}`,
          );
          if (value.help.type === 'view') {
            app.view(value.help.id, value.handler);
          } else if (value.help.type === 'event') {
            app.event(value.help.id, value.handler);
          } else if (value.help.type === 'action') {
            app.action(value.help.id, value.handler);
          } else if (value.help.type === 'options') {
            app.options(value.help.id, value.handler);
          } else if (value.help.type === 'shortcut') {
            app.shortcut(value.help.id, value.handler);
          }
          if (index === array.length - 1) resolve();
        }),
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
