import { Injectable } from '@nestjs/common';
import { CreateIpaddressDto } from './dto/create-ipaddress.dto';
import { UpdateIpaddressDto } from './dto/update-ipaddress.dto';

@Injectable()
export class IpaddressService {
  create(createIpaddressDto: CreateIpaddressDto) {
    return 'This action adds a new ipaddress';
  }

  findAll() {
    return `This action returns all ipaddress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ipaddress`;
  }

  update(id: number, updateIpaddressDto: UpdateIpaddressDto) {
    return `This action updates a #${id} ipaddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} ipaddress`;
  }
}
