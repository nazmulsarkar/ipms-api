import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  UseFilters,
  Query,
} from '@nestjs/common';
import { IpaddressService } from './ipaddress.service';
import { CreateIpaddressDto } from './dto/create-ipaddress.dto';
import { UpdateIpaddressDto } from './dto/update-ipaddress.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { MongooseErrorFilter } from '../common/filters/mongoose-error.filter';
import { CurrentUser } from '../common/decorators/user.decorator';
import { User } from '../user/entities/user.entity';
import { QueryIpaddressDto } from './dto/filter-ipaddress.dto';
import { Types } from 'mongoose';

@Controller('ipaddresses')
@UseGuards(JwtAuthGuard)
export class IpaddressController {
  constructor(private readonly ipaddressService: IpaddressService) {}

  @Post()
  @UseFilters(MongooseErrorFilter)
  async create(
    @CurrentUser() user: User,
    @Body() createModel: CreateIpaddressDto,
  ) {
    return await this.ipaddressService.create({
      createdBy: user._id,
      ...createModel,
    });
  }

  @Get()
  async findAll(@Query() queryParams: QueryIpaddressDto) {
    return await this.ipaddressService.findAll(queryParams);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ipaddressService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateModel: UpdateIpaddressDto,
  ) {
    return await this.ipaddressService.update(
      { _id: new Types.ObjectId(id) },
      updateModel,
    );
  }
}
