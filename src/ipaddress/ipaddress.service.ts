import { Injectable } from '@nestjs/common';
import { CreateIpaddressInput } from './dto/create-ipaddress.input';
import { UpdateIpaddressInput } from './dto/update-ipaddress.input';

@Injectable()
export class IpaddressService {
  create(createIpaddressInput: CreateIpaddressInput) {
    return 'This action adds a new ipaddress';
  }

  findAll() {
    return `This action returns all ipaddress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ipaddress`;
  }

  update(id: number, updateIpaddressInput: UpdateIpaddressInput) {
    return `This action updates a #${id} ipaddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} ipaddress`;
  }
}
