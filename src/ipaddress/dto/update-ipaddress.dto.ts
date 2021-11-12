import { PartialType } from '@nestjs/mapped-types';
import { CreateIpaddressDto } from './create-ipaddress.dto';

export class UpdateIpaddressDto extends PartialType(CreateIpaddressDto) {}
