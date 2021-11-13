import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { PaginationDTO } from '../../common/dto/pagination.dto';
import { BaseLogDto } from './base-log.dto';

export class FilterLogDto extends PartialType(BaseLogDto) {
  @IsOptional()
  _id?: Types.ObjectId;

  @IsOptional()
  createdBy?: Types.ObjectId;
}

export class QueryLogDto extends IntersectionType(
  PaginationDTO,
  FilterLogDto,
) {}
