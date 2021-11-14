import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';
import { LogEventEnum } from '../../common/enums/log-event.enum';
import { EntityEnum } from '../../common/enums/entity.enum';
import { User } from '../../user/entities/user.entity';

@Schema({ timestamps: true })
export class Log {
  @Prop({
    required: true,
  })
  message: string;

  @Prop({
    required: true,
  })
  data: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    refPath: 'onModel',
  })
  entity: Types.ObjectId;

  // Ass well as in the EntityEnum
  @Prop(EntityEnum)
  onModel: EntityEnum;

  // Ass well as in the EntityEnum
  @Prop(LogEventEnum)
  eventType: LogEventEnum;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
  })
  createdBy: Types.ObjectId | User;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
  })
  updatedBy: Types.ObjectId | User;

  // only read purpose, type safety
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type LogDocument = Log & Document;
export const LogSchema = SchemaFactory.createForClass(Log);
