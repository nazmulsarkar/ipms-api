import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IpaddressService } from './ipaddress.service';
import { CreateIpaddressDto } from './dto/create-ipaddress.dto';
import { UpdateIpaddressDto } from './dto/update-ipaddress.dto';

@Controller('ipaddress')
export class IpaddressController {
  constructor(private readonly ipaddressService: IpaddressService) {}

  @Post()
  create(@Body() createIpaddressDto: CreateIpaddressDto) {
    return this.ipaddressService.create(createIpaddressDto);
  }

  @Get()
  findAll() {
    return this.ipaddressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ipaddressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIpaddressDto: UpdateIpaddressDto) {
    return this.ipaddressService.update(+id, updateIpaddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ipaddressService.remove(+id);
  }
}
