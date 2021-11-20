import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LogEventEnum } from 'src/common/enums/log-event.enum';
import { QueryResponseDTO } from '../common/dto/query-response.dto';
import { EntityEnum } from '../common/enums/entity.enum';
import { LogService } from '../log/log.service';
import { CreateIpaddress } from './dto/create-ipaddress.dto';
import {
  FilterIpaddressDto,
  QueryIpaddressDto,
} from './dto/filter-ipaddress.dto';
import { UpdateIpaddress } from './dto/update-ipaddress.dto';
import { Ipaddress } from './entities/ipaddress.entity';

@Injectable()
export class IpaddressService {
  constructor(
    @InjectModel(Ipaddress.name)
    private readonly ipaddressModel: Model<Ipaddress>,
    private readonly logService: LogService,
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
    const ipAddress = new this.ipaddressModel(createModel);
    const createdIpaddress = ipAddress.save();

    if (createdIpaddress) {
      await this.createdIpaddressEventLog(ipAddress);
    }
    return createdIpaddress;
  }

  async update(filter: FilterIpaddressDto, updateModel: UpdateIpaddress) {
    const res = await this.ipaddressModel
      .findOneAndUpdate({ ...filter }, updateModel, { new: true })
      .exec();

    if (!res) {
      throw new BadRequestException();
    }

    await this.updatedIpaddressEventLog(res);

    return res;
  }

  buildQuery(filter: FilterIpaddressDto) {
    return filter;
  }

  async createdIpaddressEventLog(data: Ipaddress) {
    const log = {
      message: `A new ip address has been created`,
      entity: data._id,
      onModel: EntityEnum.IpaddressEntity,
      data: data.toString(),
      eventType: LogEventEnum.CREATED,
    };
    return this.logService.create(log);
  }

  async updatedIpaddressEventLog(data: Ipaddress) {
    const log = {
      message: `An ip address has been changed`,
      entity: data._id,
      onModel: EntityEnum.IpaddressEntity,
      data: data.toString(),
      eventType: LogEventEnum.CHNAGED,
    };
    return this.logService.create(log);
  }
}
