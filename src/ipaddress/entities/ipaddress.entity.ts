import { Ip } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { User } from '../../user/entities/user.entity';

@Schema({ timestamps: true })
export class Ipaddress {
  @Prop({
    type: Ip,
    unique: true,
    required: true,
  })
  ip: string;

  @Prop({
    required: true,
  })
  label: string;

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

export type IpaddressDocument = Ipaddress & Document;
export const IpaddressSchema = SchemaFactory.createForClass(Ipaddress);
IpaddressSchema.plugin(uniqueValidator);
