import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryResponseDTO } from '../common/dto/query-response.dto';
import { CreateLog } from './dto/create-log.dto';
import { FilterLogDto, QueryLogDto } from './dto/filter-log.dto';
import { UpdateLog } from './dto/update-log.dto';
import { Log } from './entities/log.entity';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private readonly logModel: Model<Log>) {}

  async findAll(queryParams: QueryLogDto) {
    const response = new QueryResponseDTO<Log>();

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

    response.totalCount = await this.logModel.countDocuments({
      ...filterQry,
    });

    const list = await this.logModel
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
    return await this.logModel.findById(id).exec();
  }

  async findOne(filter: Partial<Log>) {
    return await this.logModel.findOne({ ...filter }).exec();
  }

  async create(createModel: CreateLog) {
    const user = new this.logModel(createModel);
    return await user.save();
  }

  async update(filter: FilterLogDto, updateModel: UpdateLog) {
    const res = await this.logModel
      .findOneAndUpdate({ ...filter }, updateModel, { new: true })
      .exec();

    if (!res) {
      throw new BadRequestException();
    }

    return res;
  }

  buildQuery(filter: FilterLogDto) {
    return filter;
  }
}
