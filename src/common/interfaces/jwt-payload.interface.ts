import { Types } from 'mongoose';

export interface JwtPayload {
  _id: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
}
