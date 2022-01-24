import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class QuotationDto {
  @ApiProperty()
  @Matches(/^QT\d{11}$/)
  qt_id: string;
}
