import { Module } from '@nestjs/common';
import { IpaddressService } from './ipaddress.service';
import { IpaddressController } from './ipaddress.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ipaddress, IpaddressSchema } from './entities/ipaddress.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ipaddress.name,
        schema: IpaddressSchema,
      },
    ]),
  ],
  controllers: [IpaddressController],
  providers: [IpaddressService],
})
export class IpaddressModule {}
