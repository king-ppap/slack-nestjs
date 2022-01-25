import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

class ContactInterfaceDto {
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
  contact: ContactInterfaceDto;

  @ApiProperty()
  price: number;

  @ApiProperty()
  sale: string;
}
