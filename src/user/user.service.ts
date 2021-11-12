import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { QueryResponseDTO } from 'src/common/dto/query-response.dto';
import { SortDTO } from 'src/common/dto/sort.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(
    filter: User,
    pagination: PaginationDTO,
    sorts: SortDTO[],
    totalCount?: boolean,
  ): Promise<QueryResponseDTO<User>> {
    const response = new QueryResponseDTO<User>();
    const { size, page } = pagination;
    const sort = Object.assign({});
    sorts.map((s) => {
      sort[s.property] = s.direction;
    });
    if (totalCount) {
      response.totalCount = await this.userModel.countDocuments({ ...filter });
    }

    const data = await this.userModel
      .find({ ...filter })
      .sort(sort)
      .skip(page)
      .limit(size)
      .exec();

    response.data = data || [];

    response.success = data ? true : false;

    return response;
  }

  async findById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async findOne(filter: Partial<User>) {
    return await this.userModel.findOne({ ...filter }).exec();
  }

  async create(createUserDto: Partial<User>) {
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  async remove(id: string) {
    return await this.userModel.findOneAndDelete({ _id: id });
  }
}
