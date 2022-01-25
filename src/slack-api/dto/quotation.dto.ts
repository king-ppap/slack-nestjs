import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, Matches } from 'class-validator';

class ContactDto {
  @ApiProperty()
  restaurant_name: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  company: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;
}

export class SendMessageQuotationDto {
  @ApiProperty()
  qt_id: number;

  @ApiProperty()
  @Matches(/^QT\d{11}$/)
  qt_number: string;

  @ApiProperty()
  @IsDateString()
  create_dt: string;

  @ApiProperty()
  contact: ContactDto;

  @ApiProperty()
  price: number;

  @ApiProperty()
  sale: string;

  @ApiProperty()
  credit: number;

  @ApiProperty()
  @IsDateString()
  credit_due_date: string;
}

export class SendMessageQuotationViewDto extends SendMessageQuotationDto {
  tz: string;
}
