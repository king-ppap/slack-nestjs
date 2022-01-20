import { Module, OnApplicationBootstrap, Type } from '@nestjs/common';
import { SlackService } from './slack.service';
import * as quotationAction from './quotation/actions';

function createSlackFunctionsProviders(functions: Type<any>[]) {
  return [
    {
      provide: 'SLACK_FUNCTIONS',
      useValue: functions,
    },
    ...functions,
  ];
}

@Module({
  providers: [
    SlackService,
    ...createSlackFunctionsProviders(Object.values(quotationAction)),
  ],
})
export class SlackModule implements OnApplicationBootstrap {
  constructor(private service: SlackService) {}
  async onApplicationBootstrap() {
    await this.service.start();
  }
}
