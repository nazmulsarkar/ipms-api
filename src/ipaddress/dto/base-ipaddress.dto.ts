import { IsIP, IsString } from 'class-validator';

export class BaseIpaddressDto {
  @IsIP()
  ip: string;

  @IsString()
  label: string;
}
