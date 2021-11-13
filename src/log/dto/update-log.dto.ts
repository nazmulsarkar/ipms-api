import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { BaseLogDto } from './base-log.dto';

export class UpdateLogDto extends PartialType(BaseLogDto) {}
export class UpdateLog extends UpdateLogDto {
  @IsNotEmpty()
  updatedBy: Types.ObjectId;
}
