import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { BaseIpaddressDto } from './base-ipaddress.dto';

export class UpdateIpaddressDto extends PartialType(BaseIpaddressDto) {}
export class UpdateIpaddress extends UpdateIpaddressDto {
  @IsNotEmpty()
  updatedBy: Types.ObjectId;
}
