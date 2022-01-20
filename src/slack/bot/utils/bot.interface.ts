import {
  AllMiddlewareArgs,
  BlockAction,
  SlackAction,
  SlackActionMiddlewareArgs,
  SlackCommandMiddlewareArgs,
  SlackEventMiddlewareArgs,
  SlackOptionsMiddlewareArgs,
  SlackShortcutMiddlewareArgs,
  SlackViewMiddlewareArgs,
} from '@slack/bolt';

enum BotFunctionType {
  VIEW = 'view',
  EVENT = 'event',
  ACTION = 'action',
  OPTIONS = 'options',
  SHORTCUT = 'shortcut',
}
/**
 * SlackAction = BlockAction | InteractiveMessage | DialogSubmitAction | WorkflowStepEdit
 */
interface BotFunction {
  readonly help: {
    id: string;
    name: string;
    description: string;
    type: BotFunctionType;
  };
  handler: (
    arg0: (
      | SlackViewMiddlewareArgs
      | SlackEventMiddlewareArgs
      | SlackActionMiddlewareArgs<SlackAction>
      | SlackCommandMiddlewareArgs
      | SlackOptionsMiddlewareArgs
      | SlackShortcutMiddlewareArgs
    ) &
      AllMiddlewareArgs,
  ) => any;
}

export { BotFunctionType, BotFunction };
