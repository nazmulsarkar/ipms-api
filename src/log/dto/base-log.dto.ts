import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { LogEventEnum } from '../../common/enums/log-event.enum';
import { EntityEnum } from '../../common/enums/entity.enum';

export class BaseLogDto {
  @IsString()
  message: string;

  @IsString()
  data: string;

  @IsNotEmpty()
  entity: Types.ObjectId;

  @IsEnum(EntityEnum)
  onModel: EntityEnum;

  @IsEnum(LogEventEnum)
  eventType: LogEventEnum;
}
