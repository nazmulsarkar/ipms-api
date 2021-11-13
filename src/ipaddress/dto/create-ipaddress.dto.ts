import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { BaseIpaddressDto } from './base-ipaddress.dto';

export class CreateIpaddressDto extends BaseIpaddressDto {}

export class CreateIpaddress extends CreateIpaddressDto {
  @IsNotEmpty()
  createdBy: Types.ObjectId;
}
