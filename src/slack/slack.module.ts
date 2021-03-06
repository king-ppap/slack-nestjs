import { Module, OnApplicationBootstrap, Type } from '@nestjs/common';
import { SlackService } from './slack.service';
import * as quotationAction from './bot/quotation';
import { HttpModule } from '@nestjs/axios';
import { SlackController } from './slack.controller';

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
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [
    SlackService,
    ...createSlackFunctionsProviders(Object.values(quotationAction)),
  ],
  controllers: [SlackController],
  exports: [SlackService],
})
export class SlackModule implements OnApplicationBootstrap {
  constructor(private service: SlackService) {}
  async onApplicationBootstrap() {
    await this.service.start();
  }
}
