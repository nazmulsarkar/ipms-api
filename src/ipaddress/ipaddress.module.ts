import { Module } from '@nestjs/common';
import { IpaddressService } from './ipaddress.service';
import { IpaddressResolver } from './ipaddress.resolver';

@Module({
  providers: [IpaddressResolver, IpaddressService]
})
export class IpaddressModule {}
