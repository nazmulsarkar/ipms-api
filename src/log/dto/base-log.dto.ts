import { IsEnum, IsIP, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { EntityEnum } from '../../common/enums/entity.enum';

export class BaseLogDto {
  @IsIP()
  message: string;

  @IsNotEmpty()
  entity: Types.ObjectId;

  @IsEnum(EntityEnum)
  onModel: EntityEnum;
}
