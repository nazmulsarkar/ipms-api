import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

@Schema({ timestamps: true })
export class Ipaddress {
  @Prop({
    unique: true,
    required: true,
  })
  ip: string;

  @Prop({
    required: true,
  })
  label: string;

  // only read purpose, type safety
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type IpaddressDocument = Ipaddress & Document;
export const IpaddressSchema = SchemaFactory.createForClass(Ipaddress);
IpaddressSchema.plugin(uniqueValidator);
