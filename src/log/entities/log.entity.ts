import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { User } from 'src/user/entities/user.entity';

@Schema({ timestamps: true })
export class Log {
  @Prop({
    unique: true,
    required: true,
  })
  message: string;

  @Prop({
    required: true,
  })
  entity: string;

  @Prop()
  createdBy: Types.ObjectId | User;

  @Prop()
  updatedBy: Types.ObjectId | User;

  // only read purpose, type safety
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type LogDocument = Log & Document;
export const LogSchema = SchemaFactory.createForClass(Log);
LogSchema.plugin(uniqueValidator);
