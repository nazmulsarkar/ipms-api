import { IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { BaseLogDto } from './base-log.dto';

export class CreateLogDto extends BaseLogDto {}

export class CreateLog extends CreateLogDto {
  @IsOptional()
  createdBy?: Types.ObjectId;
}
