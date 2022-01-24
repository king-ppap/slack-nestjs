import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class SendMessageQuotationDto {
  @ApiProperty()
  @Matches(/^QT\d{11}$/)
  qt_id: string;
}
