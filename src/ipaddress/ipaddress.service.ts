import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryResponseDTO } from 'src/common/dto/query-response.dto';
import { CreateIpaddress } from './dto/create-ipaddress.dto';
import {
  FilteripaddressDto,
  QueryIpaddressDto,
} from './dto/filter-ipaddress.dto';
import { UpdateIpaddressDto } from './dto/update-ipaddress.dto';
import { Ipaddress } from './entities/ipaddress.entity';

@Injectable()
export class IpaddressService {
  constructor(
    @InjectModel(Ipaddress.name)
    private readonly ipaddressModel: Model<Ipaddress>,
  ) {}

  async findAll(queryParams: QueryIpaddressDto) {
    const response = new QueryResponseDTO<Ipaddress>();
    const { pageSize, pageNumber, ...rest } = queryParams;
    const filter = rest || {};
    const filterQry = this.buildQuery(filter);
    const size = pageSize || 100;
    const page = pageNumber - 1 || 0;
    const sortsQry = [{ property: 'createdAt', direction: -1 }];
    const sort = {};
    sortsQry.map((s) => {
      sort[s.property] = s.direction;
    });

    response.totalCount = await this.ipaddressModel.countDocuments({
      ...filterQry,
    });

    const list = await this.ipaddressModel
      .find({ ...filterQry })
      .sort(sort)
      .skip(page)
      .limit(size)
      .exec();
    response.data = list || [];
    response.success = list ? true : false;

    return response;
  }

  async findById(id: string) {
    return await this.ipaddressModel.findById(id).exec();
  }

  async findOne(filter: Partial<Ipaddress>) {
    return await this.ipaddressModel.findOne({ ...filter }).exec();
  }

  async create(createModel: CreateIpaddress) {
    const user = new this.ipaddressModel(createModel);
    return await user.save();
  }

  async update(filter: FilteripaddressDto, updateModel: UpdateIpaddressDto) {
    const res = await this.ipaddressModel
      .findOneAndUpdate({ ...filter }, updateModel, { new: true })
      .exec();

    if (!res) {
      throw new BadRequestException();
    }

    return res;
  }

  buildQuery(filter: FilteripaddressDto) {
    return filter;
  }
}
